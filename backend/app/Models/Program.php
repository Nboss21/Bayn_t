<?php

namespace App\Models;

use App\Enums\ProgramStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'level',
        'status',
        'tuition_fee',
        'fee_currency',
        'duration_weeks',
    ];

    protected function casts(): array
    {
        return [
            'status' => ProgramStatus::class,
            'tuition_fee' => 'decimal:2',
            'duration_weeks' => 'integer',
        ];
    }

    public function intakes(): HasMany
    {
        return $this->hasMany(Intake::class);
    }

    public function classes(): HasMany
    {
        return $this->hasMany(SchoolClass::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function galleryImages(): HasMany
    {
        return $this->hasMany(GalleryImage::class);
    }

    public function gradingConfigs(): HasMany
    {
        return $this->hasMany(GradingConfig::class);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'program_teacher')
            ->using(ProgramTeacher::class)
            ->withPivot('created_at');
    }
}
