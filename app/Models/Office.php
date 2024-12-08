<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Office extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'office_number',
        'office_name',
        'office_description',
        'office_password',
    ];
}
