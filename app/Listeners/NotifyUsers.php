<?php

namespace App\Listeners;

use App\Events\SeatOccupied;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Broadcast;

class NotifyUsers
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SeatOccupied $event): void
    {
        Broadcast::channel('office_seats', [
            'officeId' => $event->officeId,
            'seatId' => $event->seatId,
            'userId' => $event->userId,
        ]);
    }
}
