<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('classes', function (Blueprint $table): void {
            if (! Schema::hasColumn('classes', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }

            if (! Schema::hasColumn('classes', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('classes', function (Blueprint $table): void {
            $columns = [];

            if (Schema::hasColumn('classes', 'created_at')) $columns[] = 'created_at';
            if (Schema::hasColumn('classes', 'updated_at')) $columns[] = 'updated_at';

            if ($columns !== []) $table->dropColumn($columns);
        });
    }
};
