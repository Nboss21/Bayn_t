<?php

use App\Enums\IntakeStatus;
use App\Models\Intake;
use App\Models\Program;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        $start = Carbon::now()->startOfMonth();

        Program::query()->doesntHave('intakes')->each(function (Program $program) use ($start): void {
            Intake::create([
                'program_id' => $program->id,
                'name' => $start->format('F Y'),
                'start_date' => $start->toDateString(),
                'end_date' => $start->copy()->endOfMonth()->toDateString(),
                'status' => IntakeStatus::Open,
            ]);
        });
    }

    public function down(): void
    {
        // Existing intake records should not be removed during rollback.
    }
};