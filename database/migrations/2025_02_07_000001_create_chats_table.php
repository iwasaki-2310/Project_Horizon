<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('office_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('office_id')->references('office_id')->on('office_user')->onDelete('cascade')->comment('発信ユーザー');
            $table->foreign('user_id')->references('user_id')->on('office_user')->onDelete('cascade')->comment('発信ユーザー');
            $table->string('text')->nullable()->comment('チャット本文');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
