<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia::render('dashboard.index');
    }

    public function createOffice(Request $request)
    {
        try {
        } catch (Exception $e) {
            Log($e);
            dd($e);
        }
    }

    public function store(Request $request) {}
}
