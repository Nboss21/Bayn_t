<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class NotificationService
{
    public function create(User|int $user, string $type, string $message): Notification
    {
        $userId = $user instanceof User ? $user->getKey() : $user;

        return Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'message' => $message,
        ]);
    }

    /**
     * Create an event notification once for a user.
     *
     * The existing table has no event key, so the stable type/message pair
     * serves as the idempotency key for the event's recipient.
     */
    public function createOnce(User|int $user, string $type, string $message): Notification
    {
        $userId = $user instanceof User ? $user->getKey() : $user;

        return Notification::query()->firstOrCreate([
            'user_id' => $userId,
            'type' => $type,
            'message' => $message,
        ]);
    }

    /** @return Collection<int, User> */
    public function activeStaff(): Collection
    {
        return User::query()
            ->where('is_active', true)
            ->whereIn('role', ['super_admin', 'registrar'])
            ->get();
    }
}
