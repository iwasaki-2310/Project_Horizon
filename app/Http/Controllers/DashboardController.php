<?php

namespace App\Http\Controllers;

use App\Models\Office;
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
        $offices = Office::all();
        // dd($offices);
        return inertia::render('Dashboard', [
            'initialOffices' => $offices,
        ]);
    }

    public function createOffice(Request $request)
    {
        try {
            DB::transaction(function () use ($request) {
                $validateData = $request->validate([
                    'office_number' => 'required | numeric | max:999',
                    'office_name' => 'required | string | max:30',
                    'office_description' => 'required | string | max:100',
                    'office_password' => 'required | string | max:20',
                ]);

                $office = Office::create($validateData);
                Log::info("OfficeId:{$request->office_number} The office has been successfully created.");

                return response()->json([
                    'message' => "OfficeId:{$request->office_number} The office has been successfully created.",
                    'office' => $office,
                ]);
            });
        } catch (Exception $e) {
            Log::error($e);
            dd($e);
            return response()->json([
                'message' => 'Failed to create office.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request) {}
}
