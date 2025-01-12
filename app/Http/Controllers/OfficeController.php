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
use PhpParser\Node\Stmt\TryCatch;

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

    /**
     * 着席処理
     */
    // public function sitSeat(Request $request)
    // {
    //     $officeId = $request->route('office_id');
    //     $seatId = $request->route('seat_id');

    //     try {
    //         // 着席処理
    //         Seat::where('office_id', $officeId)
    //         ->where('seat_id', $seatId)
    //         ->update([
    //             'is_availalble' => false,
    //             'user_id' => $this->user->id,
    //         ]);

    //         // アバター取得
    //         $userInfo = User::where('id', $this->user->id)->first();

    //         return response()->json(['seatId' => $seatId, 'userInfo' => $userInfo], 200);

    //     } catch(Exception $e) {
    //         Log::error($e->getMessage());
    //         return back()->withErrors(['error' => '着席の処理に失敗しました。']);
    //     }
    // }

    public function seatOccupy(Request $request)
    {
        DB::beginTransaction();
        try {

            $officeId = $request->route('office_id');
            $seatId = $request->route('seat_id');
            $userInfo = User::where('id', $this->user->id)->first();
            $userAvatar = $userInfo->avatar_file_path;

            $seatInfo = Seat::where('office_id', $officeId)->where('seat_id', $seatId)->first();

            // 使用中フラグが立っている場合はエラーを返す
            // if($seatInfo->is_availalble) {
            //     return response()->json(['error' => '既に他ユーザーが着席中です。'], 400);
            // }

            // イベント発火
            event(new SeatOccupied($officeId, $seatId, $request->user()->id, $userAvatar));


            DB::commit();

            return response()->json(['success' => true, 'userInfo' => $userInfo]);

        } catch(Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['error' => '座席の使用状況の更新に失敗しました。'], 500);
        }

    }

    public function store(Request $request) {}
}
