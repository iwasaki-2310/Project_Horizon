<?php

namespace Database\Seeders;

use App\Models\User;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'familly_name' => '岩崎',
            'first_name' => '静',
            'family_name_kana' => 'イワサキ',
            'first_name_kana' => 'シズカ',
            'display_name' => 'master',
            'tel' => '09092996794',
            'email' => 'iwachan2310@gmail.com',
            'phrase' => '今日も元気に！',
            'encrypted_password' => 'password',
            'is_deleted' => '0',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        User::create([
            'id' => 2,
            'familly_name' => '田辺',
            'first_name' => '倫子',
            'family_name_kana' => 'タナベ',
            'first_name_kana' => 'ノリコ',
            'display_name' => 'rin',
            'tel' => '08022221010',
            'email' => 'test1@gmail.com',
            'phrase' => 'レッツ動画制作',
            'encrypted_password' => 'password',
            'is_deleted' => '0',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
        User::create([
            'id' => 3,
            'familly_name' => '南野',
            'first_name' => '拓実',
            'family_name_kana' => 'ミナミノ',
            'first_name_kana' => 'タクミ',
            'display_name' => '南野',
            'tel' => '08022221010',
            'email' => 'test2@gmail.com',
            'phrase' => 'ゴール決めちゃえ',
            'encrypted_password' => 'password',
            'is_deleted' => '0',
            'created_at' => new DateTime(),
            'updated_at' => new DateTime(),
        ]);
    }
}
