<?php

namespace App\Models;

use App\Enums\AssessmentCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'category',
        'sub_items',
        'raw_score',
        'weighted_score',
        'graded_by',
    ];

    protected function casts(): array
    {
        return [
            'category' => AssessmentCategory::class,
            'sub_items' => 'array',
            'raw_score' => 'decimal:2',
            'weighted_score' => 'decimal:2',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function gradedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }
}
