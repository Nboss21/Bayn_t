<?php

namespace App\Listeners;

use App\Events\ApplicationSubmitted;
use App\Models\User;
use App\Services\NotificationService;

class NotifyApplicationSubmitted
{
    public function __construct(private NotificationService $notifications) {}

    public function handle(ApplicationSubmitted $event): void
    {
        $application = $event->application;
        $type = 'application_submitted';
        $message = "Application {$application->reference_number} was submitted.";

        $this->notificationsForApplicant($application->applicant_email, $type, $message);
        foreach ($this->notifications->activeStaff() as $user) {
            $this->notifications->createOnce($user, $type, $message);
        }
    }

    private function notificationsForApplicant(string $email, string $type, string $message): void
    {
        $user = User::query()->where('email', $email)->where('is_active', true)->first();
        if ($user) {
            $this->notifications->createOnce($user, $type, $message);
        }
    }
}
