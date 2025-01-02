<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Seat extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'office_id',
        'seat_id',
        'user_id',
        'is_availalble',
    ];
}
