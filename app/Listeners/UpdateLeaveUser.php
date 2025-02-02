<?php

namespace App\Listeners;

use App\Events\OfficeUserStatusUpdated;
use App\Events\SeatOccupied;
use App\Models\OfficeUser;
use App\Models\Seat;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateLeaveUser
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
        Log::info('leaveリスナー起動');
        try {
            if($event->eventAction === 'leave') {
                OfficeUser::where('user_id', $event->userInfo->id)
                ->update([
                    'entered_at' => Null,
                ]);
    
                Log::info('ユーザーの退出に成功：' . $event->userInfo->id . 'がofficeID' . $event->officeId . 'から退出しました。');
            }
        } catch(Exception $e) {
            Log::error('ユーザーの退出処理中にエラーが発生しました。：' . $e->getMessage());
        }
    }
}
