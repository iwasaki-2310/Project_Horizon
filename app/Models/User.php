<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'family_name',
        'first_name',
        'family_name_kana',
        'first_name_kana',
        'display_name',
        'tel',
        'phrase',
        'encrypted_password',
        'is_deleted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'encrypted_password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'id' => 'integer',
            'family_name' => 'string',
            'first_name' => 'string',
            'family_name_kana' => 'string',
            'first_name_kana' => 'string',
            'display_name' => 'string',
            'tel' => 'string',
            'email' => 'string',
            'phrase' => 'string',
            'encrypted_password' => 'string',
            'is_deleted' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
