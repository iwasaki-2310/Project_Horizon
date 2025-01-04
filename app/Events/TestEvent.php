<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message; // ←ここを追加

    /**
     * Create a new event instance.
     */
    public function __construct()
    {
        $this->message = 'Hello world!'; // ←ここを追加
    }

    // 中略

    public function broadcastOn(): array
    {
        return [
            new Channel('channel-name'), // ←Channelに変更
        ];
    }
}


