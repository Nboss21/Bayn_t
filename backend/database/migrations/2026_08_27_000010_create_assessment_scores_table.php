<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assessment_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->restrictOnDelete();
            $table->foreignId('class_id')->constrained('classes')->restrictOnDelete();
            $table->enum('category', ['practical', 'theory', 'professional'])->index();
            $table->json('sub_items')->nullable();
            $table->decimal('raw_score', 8, 2);
            $table->decimal('weighted_score', 8, 2)->nullable();
            $table->foreignId('graded_by')->constrained('users')->restrictOnDelete();
            $table->timestamps();

            $table->index(['class_id', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assessment_scores');
    }
};
