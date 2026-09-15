<?php

namespace App\Enums;

enum StudentStatus: string
{
    case Applicant = 'applicant';
    case Active = 'active';
    case Completed = 'completed';
    case Suspended = 'suspended';
    case Withdrawn = 'withdrawn';
    case Graduated = 'graduated';
}
