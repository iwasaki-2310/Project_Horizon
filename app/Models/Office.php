<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Office extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'office_name',
        'office_description',
        'member_count',
        'office_password',
    ];
}
