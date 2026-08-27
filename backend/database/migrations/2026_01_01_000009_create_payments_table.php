<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->nullable()->constrained('applications')->nullOnDelete();
            $table->foreignId('student_id')->nullable()->constrained('students')->nullOnDelete();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 10)->default('USD');
            $table->enum('status', ['pending', 'successful', 'failed', 'cancelled', 'refunded'])->default('pending');
            $table->string('gateway_name')->default('stripe');
            $table->string('gateway_transaction_id')->unique();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
