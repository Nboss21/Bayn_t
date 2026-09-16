<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProgramTeacher extends Pivot
{
    protected $table = 'program_teacher';

    protected $fillable = [
        'program_id',
        'user_id',
    ];

    public $incrementing = false;

    public $timestamps = false;
}
