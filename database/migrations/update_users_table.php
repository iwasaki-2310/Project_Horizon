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
        Schema::table('users', function (Blueprint $table) {
            $table->string('familly_name');
            $table->string('first_name');
            $table->string('family_name_kana');
            $table->string('first_name_kana');
            $table->string('display_name');
            $table->string('tel');
            $table->string('phrase')->nullable();
            $table->string('encrypted_password');
            $table->boolean('is_deleted')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'familly_name',
                'first_name',
                'family_name_kana',
                'first_name_kana',
                'display_name',
                'tel',
                'phrase',
                'encrypted_password',
                'is_deleted',
            ]);
        });
    }
};
