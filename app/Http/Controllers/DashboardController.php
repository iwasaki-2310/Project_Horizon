<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
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
            $office = DB::transaction(function () use ($request) {
                $validateData = $request->validate([
                    'office_name' => 'required|string|regex:/^[A-Za-z0-9\-]+$/|max:30',
                    'office_description' => 'required|string|max:100',
                    'office_password' => 'required|string|max:20',
                ], [
                    'office_name.required' => 'オフィス名は必須です。',
                    'office_name.string' => 'オフィス名は文字列である必要があります。',
                    'office_name.regex' => 'オフィス名には半角英数字とハイフンのみ使用できます。',
                    'office_name.max' => 'オフィス名は30文字以内である必要があります。',
                    'office_description.required' => 'オフィスの概要は必須です。',
                    'office_description.string' => 'オフィスの概要は文字列である必要があります。',
                    'office_description.max' => 'オフィスの概要は100文字以内である必要があります。',
                    'office_password.required' => 'オフィスのパスワードは必須です。',
                    'office_password.string' => 'オフィスのパスワードは文字列である必要があります。',
                    'office_password.max' => 'オフィスのパスワードは20文字以内である必要があります。',
                ]);

                $validateData['member_count'] = 1;

                // dd($validateData);
                $office = Office::create($validateData);
                Log::info("オフィス作成完了,追加されたオフィスID: {$office->id}");

                return $office;
            });

            return response()->json([
                'message' => "OfficeId:{$request->office_number} The office has been successfully created.",
                'office' => $office,
            ]);
        } catch (Exception $e) {
            Log::error($e);
            return response()->json([
                'message' => 'Failed to create office.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request) {}
}
