<?php

namespace App\Http\Controllers;

use App\Models\Office;
use App\Models\Seat;
use App\Models\User;
use Carbon\Carbon;
use CreateOfficeUserTable;
use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Contracts\Support\ValidatedData;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon as SupportCarbon;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    protected $user;

    public function __construct(Request $request)
    {
        $this->user = $request->user();
    }

    public function index(Request $request)
    {
        // オフィスIDのセッションを破棄
        $request->session()->forget('office_id');

        $offices = $this->user->offices()->get();
        $initialPublicOffices = Office::where('public_flag', 1)->get();
        $userInfo = $this->user;

        Log::info('office_idのセッションを破棄しました。', ['sessionValue' => $request->session()->get('office_id')]);
        
        return inertia::render('Dashboard', [
            'initialOffices' => $offices,
            'userInfo'=> $userInfo,
            'initialPublicOffices' => $initialPublicOffices,
        ]);
    }

    public function createOffice(Request $request)
    {
        try {

            $user = $request->user();



            $office = DB::transaction(function () use ($request, $user) {
                $validateData = $request->validate([
                    'office_name' => 'required|string|max:30',
                    'office_url' => 'required|string|regex:/^[A-Za-z0-9\-]+$/|max:30',
                    'office_description' => 'required|string|max:100',
                    'office_password' => 'max:20',
                ], [
                    'office_name.required' => 'オフィス名は必須です。',
                    'office_name.max' => 'オフィス名は30文字以内である必要があります。',
                    'office_url.required' => 'オフィスURLは必須です。',
                    'office_url.string' => 'オフィスURLは文字列である必要があります。',
                    'office_url.regex' => 'オフィスURLには半角英数字とハイフンのみ使用できます。',
                    'office_url.max' => 'オフィスURLは30文字以内である必要があります。',
                    'office_description.required' => 'オフィスの概要は必須です。',
                    'office_description.string' => 'オフィスの概要は文字列である必要があります。',
                    'office_description.max' => 'オフィスの概要は100文字以内である必要があります。',
                    'office_password.required' => 'オフィスのパスワードは必須です。',
                    'office_password.string' => 'オフィスのパスワードは文字列である必要があります。',
                    'office_password.max' => 'オフィスのパスワードは20文字以内である必要があります。',
                ]);
                $validateData['public_flag'] = $request->input('office_public_flag', 0);

                $validateData['member_count'] = 1;

                $office = Office::create($validateData);

                // オフィス作成者を中間テーブルに登録
                $office->users()->syncWithoutDetaching([
                    $user->id => ['entered_at' => now()],
                ]);



                for($i=1; $i<49; $i++) {
                    $defaultSeats[$i] = [
                        'office_id' => $office->id,
                        'seat_id' => $i,
                        'user_id' => Null,
                        'is_availalble' => true,
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ];
                }
                Seat::insert($defaultSeats);

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
                'message' => 'エラーが発生しました。',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request) {}
}
