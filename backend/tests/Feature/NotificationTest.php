<?php

namespace Tests\Feature;

use App\Events\ApplicationReviewed;
use App\Events\ApplicationSubmitted;
use App\Events\PaymentStatusChanged;
use App\Events\StudentEnrolled;
use App\Models\Application;
use App\Models\Intake;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Program;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_service_persists_notifications_and_is_idempotent(): void
    {
        $user = User::factory()->create();
        $service = app(NotificationService::class);

        $service->createOnce($user, 'test', 'A test notification');
        $service->createOnce($user, 'test', 'A test notification');

        $this->assertDatabaseHas('notifications', ['user_id' => $user->id, 'type' => 'test']);
        $this->assertSame(1, Notification::query()->where('user_id', $user->id)->count());
    }

    public function test_application_events_notify_the_applicant_and_staff_once(): void
    {
        $applicant = User::factory()->create(['email' => 'applicant@example.com']);
        $registrar = User::factory()->create(['role' => 'registrar']);
        $application = $this->application('applicant@example.com');

        event(new ApplicationSubmitted($application));
        event(new ApplicationSubmitted($application));
        event(new ApplicationReviewed($application, 'approved'));

        $this->assertDatabaseHas('notifications', ['user_id' => $applicant->id, 'type' => 'application_submitted']);
        $this->assertDatabaseHas('notifications', ['user_id' => $applicant->id, 'type' => 'application_approved']);
        $this->assertSame(2, Notification::query()->where('user_id', $applicant->id)->count());
        $this->assertSame(1, Notification::query()->where('user_id', $registrar->id)->count());
    }

    public function test_payment_and_enrollment_events_select_related_recipients(): void
    {
        $studentUser = User::factory()->create();
        $teacher = User::factory()->create(['role' => 'teacher']);
        $registrar = User::factory()->create(['role' => 'registrar']);
        $application = $this->application($studentUser->email);
        $program = $application->program;
        $intake = $application->intake;
        $class = SchoolClass::create([
            'program_id' => $program->id,
            'intake_id' => $intake->id,
            'teacher_id' => $teacher->id,
            'name' => 'Section A',
            'capacity' => 20,
            'schedule' => [],
        ]);
        $student = Student::create([
            'application_id' => $application->id,
            'user_id' => $studentUser->id,
            'class_id' => $class->id,
            'status' => 'active',
            'enrolled_at' => now(),
        ]);
        $payment = Payment::create([
            'application_id' => $application->id,
            'student_id' => $student->id,
            'amount' => 100,
            'currency' => 'USD',
            'status' => 'successful',
            'gateway_name' => 'test',
            'gateway_transaction_id' => 'tx-'.uniqid(),
        ]);

        event(new PaymentStatusChanged($payment, 'successful'));
        event(new StudentEnrolled($student));

        $this->assertDatabaseHas('notifications', ['user_id' => $studentUser->id, 'type' => 'payment_successful']);
        $this->assertDatabaseHas('notifications', ['user_id' => $studentUser->id, 'type' => 'student_enrolled']);
        $this->assertDatabaseHas('notifications', ['user_id' => $teacher->id, 'type' => 'student_enrolled']);
        $this->assertDatabaseHas('notifications', ['user_id' => $registrar->id, 'type' => 'payment_successful']);
    }

    public function test_notification_api_is_scoped_to_authenticated_user(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $notification = Notification::create(['user_id' => $user->id, 'type' => 'test', 'message' => 'Unread']);
        Notification::create(['user_id' => $user->id, 'type' => 'test', 'message' => 'Read', 'read_at' => now()]);
        $otherNotification = Notification::create(['user_id' => $other->id, 'type' => 'test', 'message' => 'Private']);

        $this->actingAs($user, 'sanctum')->getJson('/api/notifications')->assertOk()->assertJsonCount(2, 'data');
        $this->actingAs($user, 'sanctum')->getJson('/api/notifications/unread')->assertOk()->assertJsonCount(1, 'data');
        $this->actingAs($user, 'sanctum')->postJson('/api/notifications/'.$notification->id.'/read')
            ->assertOk()->assertJsonPath('data.id', $notification->id);
        $this->assertNotNull($notification->refresh()->read_at);
        $this->actingAs($user, 'sanctum')->postJson('/api/notifications/'.$otherNotification->id.'/read')->assertNotFound();
    }

    private function application(string $email): Application
    {
        $program = Program::create([
            'name' => 'Program '.uniqid(), 'slug' => 'program-'.uniqid(), 'description' => 'Test',
            'category' => 'Test', 'level' => 'Beginner', 'status' => 'open', 'tuition_fee' => 100,
            'fee_currency' => 'USD', 'duration_weeks' => 4,
        ]);
        $intake = Intake::create([
            'program_id' => $program->id, 'name' => 'Intake '.uniqid(), 'start_date' => '2026-09-01',
            'end_date' => '2026-12-01', 'status' => 'open',
        ]);

        return Application::create([
            'reference_number' => 'APP-'.uniqid(), 'program_id' => $program->id, 'intake_id' => $intake->id,
            'applicant_name' => 'Applicant', 'applicant_email' => $email, 'applicant_phone' => '123',
            'status' => 'submitted', 'submitted_at' => now(),
        ]);
    }
}
