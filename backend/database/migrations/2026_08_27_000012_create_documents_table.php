<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->constrained()->restrictOnDelete();
            $table->foreignId('student_id')->nullable()->constrained()->restrictOnDelete();
            $table->enum('type', ['id_photo', 'registration_doc', 'receipt', 'certificate', 'other'])->index();
            $table->string('file_path');
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamps();

            $table->index(['application_id', 'student_id']);
        });

        DB::statement(
            'ALTER TABLE documents ADD CONSTRAINT documents_application_student_xor CHECK ((application_id IS NOT NULL) <> (student_id IS NOT NULL))'
        );
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
