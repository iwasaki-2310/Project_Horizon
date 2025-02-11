<?php

namespace App\Http\Controllers;

use App\Events\OfficeUserStatusUpdated;
use App\Events\SeatOccupied;
use App\Models\Chat;
use App\Models\Office;
use App\Models\OfficeUser;
use App\Models\Seat;
use App\Models\User;
use Carbon\Carbon;
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
        $handlingUserInfo = $this->user;
        $officeId = $request->route('office_id');
        $office = Office::where('id', $officeId)->firstOrFail();
        $currentCheckedInUsers = OfficeUser::leftJoin('users' ,'users.id', 'office_user.user_id')
        ->where('office_user.office_id', $officeId)
        ->whereNotNull('office_user.entered_at')
        ->get();
        $chats = Chat::where('office_id', $officeId)->get();

        // dd($currentCheckedInUsers);

        return Inertia::render('Office/OfficeTop', [
            'handlingUserInfo' => $handlingUserInfo,
            'office' => $office,
            'currentCheckedInUsers' => $currentCheckedInUsers,
            'chats' => $chats,
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
        $eventAction = 'join';

        DB::beginTransaction();
        try {

            // パスワード誤り
            if($office->office_password && $office->office_password !== $requestedOfficePassword) {
                return response()->json(['message' => 'パスワードが間違っています。'], 401);
            }

            // パスワード成功の場合
            event(new OfficeUserStatusUpdated (
                $requestedOfficeId,
                $this->user,
                $eventAction,
            ));

            // セッションにオフィスIDを保存
            $request->session()->put('office_id', $requestedOfficeId);
            $savedOfficeId = $request->session()->get('office_id');

            Log::info('オフィスIDをセッションに保存しました。', ['sessionValue' => $savedOfficeId]);

            DB::commit();

            return response()->json(['message' => 'パスワードが正しいです。'], 200);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
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
            $usersInfo = User::get();

            return response()->json(['seats' => $seatsInfo, 'users' => $usersInfo], 200);

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

            // 選択した座席情報
            $seledtedSeatInfo = Seat::where('office_id', $officeId)
            ->where('seat_id', $seatId)
            ->first();

            $userAvatar = Seat::leftJoin('users', 'seats.user_id', '=', 'users.id')
                ->where('seats.office_id', $officeId)
                ->where('seats.seat_id', $seatId)
                ->select('users.avatar_file_path')
                ->first();


            return response()->json(['seatInfo' => $seledtedSeatInfo, 'userAvatar' => $userAvatar]);

        } catch (Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => '座席情報の取得に失敗しました。']);
        }
    }

    public function seatOccupy(Request $request)
    {
        DB::beginTransaction();
        try {

            $officeId = $request->route('office_id');
            $seatId = $request->route('seat_id');
            $originalSeatId = Seat::where('office_id', $officeId)
            ->where('user_id', $this->user->id)
            ->value('seat_id');
            Log::info('Original Seat ID: ' . $originalSeatId);
            $userInfo = User::where('id', $this->user->id)->first();
            $userAvatar = $userInfo->avatar_file_path;
            $seledtedSeatInfo = Seat::where('office_id', $officeId)
            ->where('seat_id', $seatId)
            ->first();

            // 着席中のユーザーがいる場合は処理を中断
            if($seledtedSeatInfo->is_availalble == false) {
                return response()->json(['warning' => '既に他のユーザーが着席中'], 409);
            };

            // イベント発火
            event(new SeatOccupied(
                $officeId,
                $seatId,
                $this->user->id,
                $userAvatar,
                $originalSeatId,
            ));

            DB::commit();

            return response()->json(['seatInfo' => $seledtedSeatInfo, 'userInfo' => $userInfo]);

        } catch(Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['error' => '座席の使用状況の更新に失敗しました。'], 500);
        }

    }

    /**
     * ユーザーの離脱処理
     */
    public function leaveOffice(Request $request)
    {
        $eventAction = 'leave';
        DB::beginTransaction();
        try {
            Log::info('Request received in leaveOffice', $request->all());


            $officeId = $request->route('office_id');
            $userId = $request->route('user_id');
            $userInfo = User::where('id', $userId)->first();

            // イベント発火
            Log::info('OfficeUserStatusUpdated イベントを発火します', ['officeId' => $officeId, 'userId' => $userInfo->id]);
            event(new OfficeUserStatusUpdated (
                $officeId,
                $userInfo,
                $eventAction,
            ));
            Log::info('OfficeUserStatusUpdated event has been fired');

            DB::commit();

            return response()->json(['userInfo' => $userInfo]);

        } catch(Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['error' => '座席の使用状況の更新に失敗しました。'], 500);
        }

    }

    public function store(Request $request) {}

    /**
     * チャット送信
     */
    public function sendMessage(Request $request) {

        $officeId = $request->route('office_id');
        $userId = $request->route('user_id');
        $message = $request->input('message');

        try {
            Chat::insert(
                [
                    'office_id' => $officeId,
                    'user_id' => $userId,
                    'text' => $message,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
            );

        } catch(Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return response()->json(['error' => 'メッセージの受信に失敗しました'], 500);
        }
    }
}
