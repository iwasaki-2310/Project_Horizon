<?php

namespace App\Listeners;

use App\Events\OfficeUserStatusUpdated;
use App\Events\SeatOccupied;
use App\Events\SendMessageEvent;
use App\Models\Chat;
use App\Models\OfficeUser;
use App\Models\Seat;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateMessage
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
    public function handle(SendMessageEvent $event): void
    {
        Log::info('UpdateMessageリスナー処理開始');
        try {
            Chat::insert(
                [
                    'office_id' => $event->officeId,
                    'user_id' => $event->userId,
                    'text' => $event->message,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ],
            );
            Log::info('チャットメッセージの送信に成功：UserID' . $event->userId . 'がofficeID' . $event->officeId . 'にて「' . $event->message . '」と送信しました');
        } catch(Exception $e) {
            Log::error('ユーザーのチャットメッセージ送信中にエラーが発生しました。：' . $e->getMessage());
        }
    }
}
