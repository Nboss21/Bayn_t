<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // The create migration is nullable for new installations. This change
        // brings databases created before the draft workflow in line with it.
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            Schema::table('applications', function (Blueprint $table): void {
                $table->foreignId('program_id')->nullable()->change();
                $table->foreignId('intake_id')->nullable()->change();
                $table->string('applicant_name')->nullable()->change();
                $table->string('applicant_phone')->nullable()->change();
            });
        }
    }

    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() === 'mysql') {
            Schema::table('applications', function (Blueprint $table): void {
                $table->foreignId('program_id')->nullable(false)->change();
                $table->foreignId('intake_id')->nullable(false)->change();
                $table->string('applicant_name')->nullable(false)->change();
                $table->string('applicant_phone')->nullable(false)->change();
            });
        }
    }
};
