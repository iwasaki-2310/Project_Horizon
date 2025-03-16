<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Chat extends Authenticatable
{
    use HasFactory, Notifiable;
    use SoftDeletes;

    protected $table = 'chats';

    protected $fillable = [
        'office_id',
        'user_id',
        'text',
        'deleted_at',
    ];
}
