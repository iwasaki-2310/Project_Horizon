<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class OfficeUser extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'office_user';

    protected $fillable = [
        'user_id',
        'office_id',
        'entered_at',
    ];
}
