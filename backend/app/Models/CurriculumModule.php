<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CurriculumModule extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;

    protected $fillable = ['program_id', 'number', 'type', 'title', 'description', 'status', 'sort_order'];

    public function program(): BelongsTo { return $this->belongsTo(Program::class); }
    public function lessons(): HasMany { return $this->hasMany(CurriculumLesson::class)->orderBy('sort_order'); }
}