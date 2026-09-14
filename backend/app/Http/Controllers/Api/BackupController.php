<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\BackupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BackupController extends Controller
{
    public function __construct(private readonly BackupService $backups) {}
    public function store(Request $request) { abort_unless($request->user()->isSuperAdmin() || $request->user()->isRegistrar(), 403); try { return response()->json(['data' => $this->backups->create($request->user()->id)], 201); } catch (\Throwable $e) { report($e); return response()->json(['message' => 'Backup creation failed.'], 422); } }
    public function index(Request $request) { abort_unless($request->user()->isSuperAdmin() || $request->user()->isRegistrar(), 403); return response()->json(['data' => $this->backups->list()]); }
    public function show(Request $request, string $backup) { abort_unless($request->user()->isSuperAdmin() || $request->user()->isRegistrar(), 403); return response()->json(['data' => $this->backups->metadata($backup), 'download_url' => $this->backups->temporaryDownloadUrl($backup)]); }
    public function destroy(Request $request, string $backup) { abort_unless($request->user()->isSuperAdmin() || $request->user()->isRegistrar(), 403); $this->backups->delete($backup, $request->user()->id); return response()->json(null, 204); }
    public function restore(Request $request, string $backup) { abort_unless($request->user()->isSuperAdmin(), 403); try { return response()->json(['data' => $this->backups->restore($backup, $request->user()->id)]); } catch (\Throwable $e) { report($e); return response()->json(['message' => 'Backup restore failed.'], 422); } }
    public function download(string $backup): BinaryFileResponse { $metadata = app(BackupService::class)->metadata($backup); return response()->download(Storage::disk(config('backup.disk'))->path(trim(config('backup.directory'), '/').'/'.$metadata['filename']), $metadata['filename'], ['Content-Type' => 'application/gzip']); }
}
