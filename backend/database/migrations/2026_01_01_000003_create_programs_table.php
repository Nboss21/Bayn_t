<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('category')->nullable();
            $table->string('level')->nullable();
            $table->enum('status', ['draft', 'open', 'closed', 'archived'])->default('draft');
            $table->decimal('tuition_fee', 10, 2)->default(0.00);
            $table->string('fee_currency', 10)->default('USD');
            $table->integer('duration_weeks')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
