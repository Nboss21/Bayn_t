<?php

namespace App\Events;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ApplicationReviewed
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Application $application,
        public ApplicationStatus|string $status,
    ) {}
}
