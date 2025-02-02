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
    public $userInfo;

    /**
     * Create a new event instance.
     */
    public function __construct($officeId, $userInfo)
    {
        $this->officeId = $officeId;
        $this->userInfo = $userInfo;
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
            'user' => [
                'id' => $this->userInfo->id,
                'name' => $this->userInfo->name,
                'avatar_file_path' => $this->userInfo->avatar_file_path,
            ]
        ];
        Log::info('OfficeLeave event triggered:', $data);

        return $data;
    }
}
