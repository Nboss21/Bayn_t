<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_webhook_logs', function (Blueprint $table) {
            $table->id();
            $table->string('event_id')->nullable()->index();
            $table->string('gateway_name')->default('melapays')->index();
            $table->string('tx_ref')->nullable()->index();
            $table->string('event_type')->nullable()->index();
            $table->json('payload');
            $table->json('headers')->nullable();
            $table->string('status')->default('processed')->index(); // processed, duplicate, failed, invalid_signature
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->index(['gateway_name', 'tx_ref']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_webhook_logs');
    }
};
