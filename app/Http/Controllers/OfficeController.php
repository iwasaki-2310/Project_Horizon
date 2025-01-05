<?php

namespace App\Http\Controllers;

use App\Events\SeatOccupied;
use App\Models\Office;
use App\Models\OfficeUser;
use App\Models\Seat;
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

    protected $user;

    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }

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
        $office = Office::where('id', $requestedOfficeId)->first();

        try {

            // パスワード誤り
            if($office->office_password !== $requestedOfficePassword) {
                return response()->json(['message' => 'パスワードが間違っています。'], 401);
            }

            // パスワード成功
            OfficeUser::insert([
                'office_id' => $requestedOfficeId,
                'user_id' => $this->user->id,
            ]);

            // セッションにオフィスIDを保存
            $request->session()->put('office_id', $requestedOfficeId);

            return response()->json(['message' => 'パスワードが正しいです。'], 200);

        } catch (Exception $e) {
            dd($e);
            return response()->json(['message' => Log::error($e->getMessage())], 500);
        }

    }

    /**
     * 座席情報取得
     */
    public function getSeatsStatus(Request $request)
    {
        $officeId = $request->route('office_id');
        try {
            $seatsInfo = Seat::where('office_id', $officeId)->get();

            return response()->json(['seats' => $seatsInfo], 200);

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => '座席情報の取得に失敗しました。']);
        }
    }

    /**
     * 特定の座席情報取得
     */
    public function getSelectedSeatStatus(Request $request)
    {
        $officeId = $request->route('office_id');
        $seatId = $request->route('seat_id');
        try {
            $seledtedSeatInfo = Seat::where('office_id', $officeId)
            ->where('seat_id', $seatId)
            ->get();

            return response()->json($seledtedSeatInfo, 200);

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => '座席情報の取得に失敗しました。']);
        }
    }

    public function seatOccupy(Request $request)
    {

        $seatInfo = Seat::findOrFail($request->seatId);

        // 使用中フラグが立っている場合はエラーを返す
        if($seatInfo->is_occupied) {
            return response()->json(['error' => '既に他ユーザーが着席中です。'], 400);
        }

        // イベント発火
        event(new SeatOccupied($request->office_id, $request->seatId, $request->user()->id));

        return response()->json(['success' => true]);
    }

    public function store(Request $request) {}
}
