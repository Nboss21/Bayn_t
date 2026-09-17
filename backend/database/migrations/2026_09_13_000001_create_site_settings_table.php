<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('institution_name')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('phone')->nullable();
            $table->text('address')->nullable();
            $table->json('social_links')->nullable();
            $table->text('about_text')->nullable();
            $table->text('footer_text')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('site_settings'); }
};
