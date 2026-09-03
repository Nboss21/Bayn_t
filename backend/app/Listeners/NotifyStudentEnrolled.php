<?php

namespace App\Listeners;

use App\Events\StudentEnrolled;
use App\Models\User;
use App\Services\NotificationService;

class NotifyStudentEnrolled
{
    public function __construct(private NotificationService $notifications) {}

    public function handle(StudentEnrolled $event): void
    {
        $student = $event->student->loadMissing(['user', 'application', 'schoolClass.teacher']);
        $type = 'student_enrolled';
        $message = "Student enrollment {$student->id} is now active.";
        $recipients = collect([$student->user, $student->schoolClass?->teacher]);

        if (! $student->user && $student->application?->applicant_email) {
            $recipients->push(User::query()->where('email', $student->application->applicant_email)->first());
        }

        foreach ($recipients->filter(fn (?User $user) => $user?->is_active)->unique('id') as $user) {
            $this->notifications->createOnce($user, $type, $message);
        }
        foreach ($this->notifications->activeStaff() as $user) {
            $this->notifications->createOnce($user, $type, $message);
        }
    }
}
