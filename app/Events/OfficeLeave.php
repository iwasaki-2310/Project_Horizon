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
 * イベントクラス OfficeLeave
 * オフィスの
 */
class OfficeLeave implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $officeId;
    public $userId;

    /**
     * Create a new event instance.
     */
    public function __construct($officeId, $userId)
    {
        $this->officeId = $officeId;
        $this->userId = $userId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::info('BroadcastOn called for channel: office_entering_user');
        return [
            new PrivateChannel('office_entering_user'),
        ];
    }

    public function broadcastWith()
    {
        $data = [
            'officeId' => $this->officeId,
            'userId' => $this->userId,
        ];
        Log::info('OfficeLeave event triggered:', $data);

        return $data;
    }
}
