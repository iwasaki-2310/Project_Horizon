<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia::render('dashboard.index');
    }

    public function createOffice() {}

    public function store(Request $request) {}
}
