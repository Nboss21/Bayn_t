<?php

namespace App\Providers;

use App\Events\ApplicationReviewed;
use App\Events\ApplicationSubmitted;
use App\Events\PaymentStatusChanged;
use App\Events\StudentEnrolled;
use App\Listeners\NotifyApplicationReviewed;
use App\Listeners\NotifyApplicationSubmitted;
use App\Listeners\NotifyPaymentStatusChanged;
use App\Listeners\NotifyStudentEnrolled;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        ApplicationSubmitted::class => [NotifyApplicationSubmitted::class],
        ApplicationReviewed::class => [NotifyApplicationReviewed::class],
        PaymentStatusChanged::class => [NotifyPaymentStatusChanged::class],
        StudentEnrolled::class => [NotifyStudentEnrolled::class],
    ];
}
