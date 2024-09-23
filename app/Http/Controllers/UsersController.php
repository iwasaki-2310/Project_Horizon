<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index()
    {
        return inertia::render('User/Index', [
            'users' => User::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }
}
