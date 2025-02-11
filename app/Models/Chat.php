<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Chat extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'chats';

    protected $fillable = [
        'office_id',
        'user_id',
        'text'
    ];
}
