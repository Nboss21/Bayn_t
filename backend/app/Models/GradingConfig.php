<?php

namespace App\Models;

use App\Enums\AssessmentCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GradingConfig extends Model
{
    use HasFactory;

    protected $fillable = [
        'program_id',
        'category',
        'weight_percentage',
    ];

    protected function casts(): array
    {
        return [
            'category' => AssessmentCategory::class,
            'weight_percentage' => 'decimal:2',
        ];
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }
}
