<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

abstract class Controller
{
    public function __construct()
    {
        // ユーザー情報取得
        Inertia::share([
            'auth' => function() {
                return Auth::check() ? Auth::user() : null;
            }
        ]);
    }
}
