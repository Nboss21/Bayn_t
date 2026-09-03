<?php

namespace App\Listeners;

use App\Enums\PaymentStatus;
use App\Events\PaymentStatusChanged;
use App\Models\User;
use App\Services\NotificationService;

class NotifyPaymentStatusChanged
{
    public function __construct(private NotificationService $notifications) {}

    public function handle(PaymentStatusChanged $event): void
    {
        $status = $event->status instanceof PaymentStatus ? $event->status : PaymentStatus::from($event->status);
        $payment = $event->payment->loadMissing(['student.user', 'application']);
        $type = 'payment_'.$status->value;
        $message = "Payment {$payment->id} status changed to {$status->value}.";
        $recipients = collect([$payment->student?->user]);

        if (! $payment->student?->user && $payment->application?->applicant_email) {
            $recipients->push(User::query()->where('email', $payment->application->applicant_email)->first());
        }

        foreach ($recipients->filter(fn (?User $user) => $user?->is_active)->unique('id') as $user) {
            $this->notifications->createOnce($user, $type, $message);
        }
        foreach ($this->notifications->activeStaff() as $user) {
            $this->notifications->createOnce($user, $type, $message);
        }
    }
}
