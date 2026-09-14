<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Non-persisted audit target representing a backup archive.
 */
class BackupArtifact extends Model
{
    public $timestamps = false;
    public $incrementing = false;
    protected $table = 'backup_artifacts';
    protected $fillable = ['id'];
    protected $primaryKey = 'id';
    protected $keyType = 'string';
}
