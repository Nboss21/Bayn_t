<?php

namespace App\Services;

use App\Models\BackupArtifact;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use RuntimeException;

class BackupService
{
    public function list(): array
    {
        $disk = Storage::disk(config('backup.disk'));
        return collect($disk->files(config('backup.directory')))->filter(fn (string $path) => $this->isValidName(basename($path)))->map(fn (string $path) => $this->metadata(basename($path)))->sortByDesc('created_at')->values()->all();
    }

    public function create(?int $actorId = null): array
    {
        $this->assertMysql();
        $disk = Storage::disk(config('backup.disk'));
        $directory = trim(config('backup.directory'), '/');
        $filename = 'backup-'.now()->format('Ymd-His').'-'.Str::lower(Str::random(12)).'.tar.gz';
        $archive = $disk->path($directory.'/'.$filename);
        $work = storage_path('app/backup-work/'.Str::uuid());
        File::ensureDirectoryExists($work);
        try {
            $sql = $work.'/database.sql';
            $this->dump($sql);
            if (config('backup.include_files')) $this->copyPersistentFiles($work);
            $this->archive($work, $archive);
            $metadata = $this->metadata($filename);
            $this->audit('backup.created', $filename, $actorId, ['size' => $metadata['size'], 'includes_files' => (bool) config('backup.include_files')]);
            return $metadata;
        } catch (\Throwable $e) {
            if (is_file($archive)) @unlink($archive);
            throw new RuntimeException('Backup creation failed: '.$this->safeMessage($e), 0, $e);
        } finally {
            File::deleteDirectory($work);
        }
    }

    public function delete(string $filename, ?int $actorId = null): void
    {
        $this->assertValidName($filename);
        $disk = Storage::disk(config('backup.disk'));
        abort_unless($disk->exists($this->path($filename)), 404, 'Backup not found.');
        $disk->delete($this->path($filename));
        $this->audit('backup.deleted', $filename, $actorId);
    }

    public function restore(string $filename, ?int $actorId = null): array
    {
        $this->assertMysql();
        $this->assertValidName($filename);
        $disk = Storage::disk(config('backup.disk'));
        abort_unless($disk->exists($this->path($filename)), 404, 'Backup not found.');
        $archive = $disk->path($this->path($filename));
        $this->audit('restore.started', $filename, $actorId);
        $safety = null;
        try {
            $safety = $this->create($actorId);
            $work = storage_path('app/backup-work/'.Str::uuid());
            File::ensureDirectoryExists($work);
            try {
                $this->extract($archive, $work);
                $sql = $work.'/database.sql';
                abort_unless(is_file($sql) && filesize($sql) > 0, 422, 'The backup archive is invalid.');
                $this->restoreDatabase($sql);
                if (config('backup.include_files')) $this->restorePersistentFiles($work);
            } finally {
                File::deleteDirectory($work);
            }
            $this->audit('restore.completed', $filename, $actorId, ['safety_backup' => $safety['filename']]);
            return ['restored' => $filename, 'safety_backup' => $safety];
        } catch (\Throwable $e) {
            $this->audit('restore.failed', $filename, $actorId, ['error' => $this->safeMessage($e)]);
            throw new RuntimeException('Restore failed. The database was not reported as restored.', 0, $e);
        }
    }

    public function prune(?int $actorId = null): int
    {
        $cutoff = now()->subDays(max(0, (int) config('backup.retention_days')));
        $deleted = 0;
        foreach ($this->list() as $backup) {
            if ($backup['created_at']->lt($cutoff)) {
                $this->delete($backup['filename'], $actorId);
                $deleted++;
            }
        }
        return $deleted;
    }

    public function metadata(string $filename): array
    {
        $this->assertValidName($filename);
        $disk = Storage::disk(config('backup.disk'));
        abort_unless($disk->exists($this->path($filename)), 404, 'Backup not found.');
        return ['filename' => $filename, 'size' => $disk->size($this->path($filename)), 'created_at' => \Carbon\Carbon::createFromTimestamp($disk->lastModified($this->path($filename))), 'type' => 'database_and_files', 'status' => 'available'];
    }

    public function temporaryDownloadUrl(string $filename): string
    {
        $this->assertValidName($filename);
        abort_unless(Storage::disk(config('backup.disk'))->exists($this->path($filename)), 404, 'Backup not found.');
        return \Illuminate\Support\Facades\URL::temporarySignedRoute('backups.download', now()->addMinutes(10), ['backup' => $filename]);
    }

    private function dump(string $sql): void
    {
        $config = config('database.connections.'.config('database.default'));
        $process = new Process([$this->binary('mysqldump'), '--single-transaction', '--routines', '--triggers', '--host='.$config['host'], '--port='.$config['port'], '--user='.$config['username'], '--databases', $config['database'], '--result-file='.$sql], base_path(), ['MYSQL_PWD' => (string) ($config['password'] ?? '')]);
        $process->setTimeout(null); $process->run();
        if (! $process->isSuccessful()) throw new RuntimeException('Database dump command failed.');
    }

    private function restoreDatabase(string $sql): void
    {
        $config = config('database.connections.'.config('database.default'));
        $process = new Process([$this->binary('mysql'), '--host='.$config['host'], '--port='.$config['port'], '--user='.$config['username'], $config['database']], base_path(), ['MYSQL_PWD' => (string) ($config['password'] ?? '')]);
        $process->setInput(fopen($sql, 'rb')); $process->setTimeout(null); $process->run();
        if (! $process->isSuccessful()) throw new RuntimeException('Database restore command failed.');
    }

    private function archive(string $work, string $archive): void
    {
        File::ensureDirectoryExists(dirname($archive));
        $process = new Process(['tar', '-czf', $archive, '-C', $work, '.']);
        $process->setTimeout(null); $process->run();
        if (! $process->isSuccessful()) throw new RuntimeException('Backup archive command failed.');
    }

    private function extract(string $archive, string $work): void
    {
        $process = new Process(['tar', '--no-absolute-names', '--no-same-owner', '-xzf', $archive, '-C', $work]);
        $process->setTimeout(null); $process->run();
        if (! $process->isSuccessful()) throw new RuntimeException('Backup archive is not a valid gzip tar archive.');
    }

    private function restorePersistentFiles(string $work): void
    {
        if (is_dir($work.'/files/private')) File::copyDirectory($work.'/files/private', Storage::disk('private_documents')->path(''));
        if (is_dir($work.'/files/public')) File::copyDirectory($work.'/files/public', Storage::disk('public_assets')->path(''));
    }

    private function copyPersistentFiles(string $work): void
    {
        $private = Storage::disk('private_documents')->path('');
        $public = Storage::disk('public_assets')->path('');
        if (is_dir($private)) File::copyDirectory($private, $work.'/files/private');
        if (is_dir($public)) File::copyDirectory($public, $work.'/files/public');
        File::deleteDirectory($work.'/files/private/'.trim(config('backup.directory'), '/'));
    }

    private function binary(string $type): string { return (string) config('backup.'.($type === 'mysqldump' ? 'mysqldump_binary' : 'mysql_binary')); }
    private function path(string $filename): string { return trim(config('backup.directory'), '/').'/'.$filename; }
    private function isValidName(string $filename): bool { return (bool) preg_match('/^backup-[0-9]{8}-[0-9]{6}-[a-z0-9]{12}\.tar\.gz$/', $filename); }
    private function assertValidName(string $filename): void { abort_unless($this->isValidName(basename($filename)) && basename($filename) === $filename, 422, 'Invalid backup name.'); }
    private function assertMysql(): void { abort_unless(in_array(config('database.default'), ['mysql', 'mariadb'], true), 422, 'Backups require a MySQL or MariaDB connection.'); }
    private function audit(string $action, string $filename, ?int $actorId, array $after = []): void { app(AuditLogService::class)->log($action, new BackupArtifact(['id' => $filename]), null, $after ?: null, $actorId); }
    private function safeMessage(\Throwable $e): string { return str_contains(strtolower($e->getMessage()), 'password') ? 'The database backup operation failed.' : $e->getMessage(); }
}
