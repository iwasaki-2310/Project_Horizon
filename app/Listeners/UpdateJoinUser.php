<?php

namespace App\Listeners;

use App\Events\OfficeUserStatusUpdated;
use App\Events\SeatOccupied;
use App\Models\OfficeUser;
use App\Models\Seat;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateJoinUser
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {

    }

    /**
     * Handle the event.
     */
    public function handle(OfficeUserStatusUpdated $event): void
    {
        Log::info('joinリスナー処理開始');
        try {
            if($event->eventAction === 'join') {
                OfficeUser::upsert(
                    [
                        // レコードデータ
                        [
                            'office_id' => $event->officeId,
                            'user_id' => $event->userInfo->id,
                            'entered_at' => Carbon::now(),
                        ]
                    ],
                    ['office_id', 'user_id'], //一意にする条件
                    ['entered_at'] //updateの場合に更新するカラム
                );

                Log::info('ユーザーの入室に成功：' . $event->userInfo->id . 'がofficeID' . $event->officeId . 'に入室しました。');
            }
        } catch(Exception $e) {
            Log::error('ユーザーの退出処理中にエラーが発生しました。：' . $e->getMessage());
        }
    }
}
