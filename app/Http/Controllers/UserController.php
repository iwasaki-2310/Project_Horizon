<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return inertia::render('User/Index', [
            'users' => User::all()
        ]);
    }
}
