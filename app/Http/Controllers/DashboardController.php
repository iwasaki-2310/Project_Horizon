<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
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
            DB::beginTransaction();
        } catch (Exception $e) {
            DB::rollBack();
            Log($e);
            dd($e);
        }
    }

    public function store(Request $request) {}
}
