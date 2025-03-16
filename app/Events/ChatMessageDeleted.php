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
 * イベントクラス OfficeUserStatusUpdated
 * オフィスの
 */
class ChatMessageDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $activeChats;

    /**
     * Create a new event instance.
     */
    public function __construct($activeChats)
    {
        $this->activeChats = $activeChats;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::info('BroadcastOn called for channel: deleted_leave_user_messages');
        return [
            new PrivateChannel('deleted_leave_user_messages'),
        ];
    }

    public function broadcastWith()
    {
        $data = collect($this->activeChats)->values();
        Log::info('ChatMessageDeleted event triggered:', $data->toArray());

        return $data->toArray();
    }
}
