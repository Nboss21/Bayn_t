<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CurriculumLesson extends \Illuminate\Database\Eloquent\Model
{
    use HasFactory;

    protected $fillable = ['curriculum_module_id', 'title', 'sort_order'];

    public function module(): BelongsTo { return $this->belongsTo(CurriculumModule::class, 'curriculum_module_id'); }
}