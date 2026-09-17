<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('curriculum_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('number');
            $table->string('type')->default('module');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('status')->default('upcoming');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['program_id', 'number']);
        });

        Schema::create('curriculum_lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculum_module_id')->constrained('curriculum_modules')->cascadeOnDelete();
            $table->string('title');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('curriculum_lesson_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignId('lesson_id')->constrained('curriculum_lessons')->cascadeOnDelete();
            $table->boolean('completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['class_id', 'lesson_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('curriculum_lesson_progress');
        Schema::dropIfExists('curriculum_lessons');
        Schema::dropIfExists('curriculum_modules');
    }
};