<?php

namespace App\Listeners;

use App\Events\SeatOccupied;
use App\Models\Seat;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

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

        Seat::where('seat_id', $event->seatId)
        ->where('office_id', $event->officeId)
        ->update([
            'is_availalble' => false,
            'user_id' => $event->userId,
        ]);
    }
}
