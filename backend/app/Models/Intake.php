<?php

namespace App\Models;

use App\Enums\IntakeStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Intake extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'name',
        'start_date',
        'end_date',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'status' => IntakeStatus::class,
        ];
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    public function classes(): HasMany
    {
        return $this->hasMany(SchoolClass::class);
    }
}
