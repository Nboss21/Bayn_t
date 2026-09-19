<?php

namespace App\Models;

use App\Enums\CompletionReviewStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompletionReview extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id', 'class_id', 'teacher_id', 'reviewed_by', 'status',
        'review_comment', 'snapshot', 'submitted_at', 'reviewed_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => CompletionReviewStatus::class,
            'snapshot' => 'array',
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function student(): BelongsTo { return $this->belongsTo(Student::class); }
    public function schoolClass(): BelongsTo { return $this->belongsTo(SchoolClass::class, 'class_id'); }
    public function teacher(): BelongsTo { return $this->belongsTo(User::class, 'teacher_id'); }
    public function reviewer(): BelongsTo { return $this->belongsTo(User::class, 'reviewed_by'); }
}
