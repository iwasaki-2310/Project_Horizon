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
        'office_url',
        'office_description',
        'public_flag',
        'member_count',
        'office_password',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'office_user')
            ->withPivot('entered_at')
            ->withTimestamps();
    }
}
