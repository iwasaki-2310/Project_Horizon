<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\User;
use CreateOfficeUserTable;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OfficeController extends Controller
{

    public function show($officeName)
    {
        $office = Office::where('office_name', $officeName)->firstOrFail();

        return Inertia::render('Office/OfficeTop', [
            'office' => $office,
        ]);
    }

    public function store(Request $request) {}
}
