<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('office_seats', function($user) {
    return $user !== null;
});
Broadcast::channel('office_entering_user', function($user) {
    return true;
});
Broadcast::channel('deleted_leave_user_messages', function($user) {
    return true;
});
Broadcast::channel('send_message', function($user) {
    return true;
});
