<?php

use App\Providers\AppServiceProvider;
use App\Providers\EventServiceProvider;
use Laravel\Sanctum\SanctumServiceProvider;

return [
    AppServiceProvider::class,
    EventServiceProvider::class,
    SanctumServiceProvider::class,
];
