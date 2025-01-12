<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

/**
 * イベントクラス SeatOccupied
 * オフィスの座席がユーザーによって占有されたことを通知するためのイベント
 */
class SeatOccupied implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $officeId;
    public $seatId;
    public $userId;
    public $userAvatar;

    /**
     * Create a new event instance.
     */
    public function __construct($officeId, $seatId, $userId, $userAvatar)
    {
        $this->officeId = $officeId;
        $this->seatId = $seatId;
        $this->userId = $userId;
        $this->userAvatar = $userAvatar;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('office_seats'),
        ];
    }

    public function broadcastWith()
    {
        return [
            'seatId' => $this->seatId,
            'userId' => $this->userId,
            'userAvatar' => $this->userAvatar,
        ];
        Log::info('SeatOccupied event triggered:', $this->broadcastWith());
    }



}
