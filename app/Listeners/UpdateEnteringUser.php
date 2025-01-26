<?php

namespace App\Listeners;

use App\Events\OfficeLeave;
use App\Events\SeatOccupied;
use App\Models\OfficeUser;
use App\Models\Seat;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateEnteringUser
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
    public function handle(OfficeLeave $event): void
    {   
        Log::info('リスナー起動');
        try {
            OfficeUser::where('user_id', $event->userId)
            ->update([
                'entered_at' => Null,
            ]);

            Log::info('ユーザーの退出に成功：' . $event->userId . 'がofficeID' . $event->officeId . 'から退出しました。');
        } catch(Exception $e) {
            Log::error('ユーザーの退出処理中にエラーが発生しました。：' . $e->getMessage());
        }
    }
}
