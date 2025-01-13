<?php

namespace App\Listeners;

use App\Events\SeatOccupied;
use App\Models\Seat;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateSeatStatus
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
    public function handle(SeatOccupied $event): void
    {
        try {
            // ユーザーが現在占有している座席をリセット
            if(!empty($event->originalSeatId)) {
                $originalSeatInfo = Seat::where('office_id', $event->officeId)
                ->where('seat_id', $event->originalSeatId)
                ->update([
                    'is_availalble' => true,
                    'user_id' => null,
                ]);
                Log::info('元の座席をリセットしました: seat_id=' . $event->originalSeatId);
            } else {
                Log::info('元の座席情報が存在しません（初回使用の可能性）');
            }

            Seat::where('seat_id', $event->seatId)
            ->where('office_id', $event->officeId)
            ->update([
                'is_availalble' => false,
                'user_id' => $event->userId,
            ]);

            Log::info('座席更新に成功：' . $event->userId . 'がofficeID' . $event->officeId . 'の座席ID' . $event->seatId . 'を占有');
        } catch(Exception $e) {
            Log::error('座席更新中にエラー：' . $e->getMessage());
        }
    }
}
