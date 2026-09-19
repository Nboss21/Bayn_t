<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table): void {
            // Keep the migration portable across PostgreSQL and MySQL.
            $table->string('city')->nullable();
            $table->string('area')->nullable();
            $table->string('landmark')->nullable();
            $table->string('education')->nullable();
            $table->string('experience')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table): void {
            $table->dropColumn(['city', 'area', 'landmark', 'education', 'experience']);
        });
    }
};
