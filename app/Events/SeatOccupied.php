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
    public $originalSeatId;
    public $isAvailable;

    /**
     * Create a new event instance.
     */
    public function __construct($officeId, $seatId, $userId, $userAvatar, $originalSeatId, $isAvailable)
    {
        $this->officeId = $officeId;
        $this->seatId = $seatId;
        $this->userId = $userId;
        $this->userAvatar = $userAvatar;
        $this->originalSeatId = $originalSeatId;
        $this->isAvailable = $isAvailable;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::info('BroadcastOn called for channel: office_seats');
        return [
            new PrivateChannel('office_seats'),
        ];
    }

    public function broadcastWith()
    {
        $data = [
            'officeId' => $this->officeId,
            'seatId' => $this->seatId,
            'originalSeatId' => $this->originalSeatId ?? null,
            'userId' => $this->userId,
            'userAvatar' => $this->userAvatar,
            'isAvailable' => $this->isAvailable,
        ];
        Log::info('SeatOccupied event triggered:', $data);

        return $data;
    }
}
