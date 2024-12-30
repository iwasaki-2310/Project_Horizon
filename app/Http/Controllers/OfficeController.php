<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\OfficeUser;
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

    public function show(Request $request)
    {
        $officeId = $request->route('office_id');
        $office = Office::where('id', $officeId)->firstOrFail();

        return Inertia::render('Office/OfficeTop', [
            'office' => $office,
        ]);
    }

    public function showInputPassword(Request $request)
    {
        $officeId = $request->route('office_id');

        return Inertia::render('Office/Password', [
            'officeId' => $officeId,
        ]);
    }

    public function joinOffice(Request $request)
    {
        $requestedOfficePassword = $request->office_password;
        $requestedOfficeId = $request->route('office_id');

        try {
            $office = Office::where('id', $requestedOfficeId)->first();

            // パスワード誤り
            if($office->office_password !== $requestedOfficePassword) {
                return response()->json(['message' => 'パスワードが間違っています。'], 401);
            }

            // パスワード成功
            // OfficeUser::insert
            $request->session()->put('office_id', $requestedOfficeId);
            return response()->json(['message' => 'パスワードが正しいです。'], 200);


        } catch (Exception $e) {
            return response()->json(['message' => 'エラーが発生しました。'], 500);
            dd($e);
        }

    }

    public function store(Request $request) {}
}
