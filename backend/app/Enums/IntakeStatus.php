<?php

namespace App\Enums;

enum IntakeStatus: string
{
    case Upcoming = 'upcoming';
    case Open = 'open';
    case Closed = 'closed';
    case Completed = 'completed';
}
