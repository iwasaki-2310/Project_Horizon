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
        Schema::create('seats', function (Blueprint $table) {
            $table->unsignedBigInteger('office_id')->comment('オフィスID');
            $table->unsignedBigInteger('seat_id')->comment('座席ID');
            $table->unsignedBigInteger('user_id')->nullable()->default(null)->comment('着席中ユーザーID');
            $table->string('is_availalble')->comment('利用可能フラグ');
            $table->timestamps();

            // 一意制約
            $table->unique(['seat_id', 'office_id'], 'unique_seat_office');

            // 外部キー制約
            $table->foreign('office_id')->references('id')->on('offices')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seats');
    }
};
