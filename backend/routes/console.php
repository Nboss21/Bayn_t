<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Services\BackupService;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('backup:create', function (BackupService $backups) {
    try { $backup = $backups->create(); $this->info('Backup created: '.$backup['filename'].' ('.$backup['size'].' bytes)'); return self::SUCCESS; }
    catch (\Throwable $e) { $this->error($e->getMessage()); return self::FAILURE; }
})->purpose('Create a protected database and files backup');

Artisan::command('backup:list', function (BackupService $backups) {
    foreach ($backups->list() as $backup) $this->line($backup['filename'].' '.$backup['size'].' bytes '.$backup['created_at']->toIso8601String());
    return self::SUCCESS;
})->purpose('List protected backups');

Artisan::command('backup:restore {backup}', function (BackupService $backups) {
    if (! $this->confirm('This will replace the configured database. Continue?', false)) return self::FAILURE;
    try { $result = $backups->restore($this->argument('backup')); $this->info('Restore completed. Safety backup: '.$result['safety_backup']['filename']); return self::SUCCESS; }
    catch (\Throwable $e) { $this->error($e->getMessage()); return self::FAILURE; }
})->purpose('Restore a protected backup after creating a safety backup');

$backupSchedule = match (config('backup.schedule')) {
    'hourly' => Schedule::call(fn (BackupService $backups) => $backups->create())->hourly(),
    'weekly' => Schedule::call(fn (BackupService $backups) => $backups->create())->weekly(),
    default => Schedule::call(fn (BackupService $backups) => $backups->create())->daily(),
};
$backupSchedule->name('database-backup')->withoutOverlapping();
Schedule::call(fn (BackupService $backups) => $backups->prune())->daily()->name('backup-retention')->withoutOverlapping();
