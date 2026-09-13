<?php

namespace Tests\Unit;

use App\Models\User;
use App\Policies\IntakePolicy;
use App\Policies\ProgramPolicy;
use App\Services\BackupService;
use Tests\TestCase;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SecurityHardeningTest extends TestCase
{
    public function test_students_cannot_mutate_programs_or_intakes(): void
    {
        $student = new User(['role' => 'student']);

        $this->assertFalse((new ProgramPolicy)->create($student));
        $this->assertFalse((new ProgramPolicy)->update($student, new \App\Models\Program));
        $this->assertFalse((new IntakePolicy)->create($student));
        $this->assertFalse((new IntakePolicy)->update($student, new \App\Models\Intake));
    }

    public function test_backup_service_rejects_path_traversal_and_untrusted_names(): void
    {
        $service = new BackupService;

        $this->expectException(HttpException::class);
        $service->metadata('../laravel.log');
    }
}
