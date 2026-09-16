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
            $table->foreignId('application_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('student_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 12, 2);
            $table->string('currency');
            $table->enum('status', ['pending', 'successful', 'failed', 'cancelled', 'refunded'])->index();
            $table->string('gateway_name');
            $table->string('gateway_transaction_id')->unique();
            $table->timestamp('paid_at')->nullable()->index();
            $table->timestamps();

            $table->index(['application_id', 'student_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
