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
 * イベントクラス SendMessageEvent
 * オフィスの
 */
class SendMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $officeId;
    public $userId;
    public $message;
    public $hasSentMessage;

    /**
     * Create a new event instance.
     */
    public function __construct($officeId, $userId, $message, $hasSentMessage)
    {
        $this->officeId = $officeId;
        $this->userId = $userId;
        $this->message = $message;
        $this->hasSentMessage = $hasSentMessage;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::info('BroadcastOn called for channel: send_message');
        return [
            new PrivateChannel('send_message'),
        ];
    }

    public function broadcastWith()
    {
        $data = [
            'officeId' => $this->officeId,
            'userId' => $this->userId,
            'message' => $this->message,
            'hasSentMessage' => $this->hasSentMessage,
        ];
        Log::info('SendMessageEvent triggered:', $data);

        return $data;
    }
}
