<?php

namespace App\Enums;

enum AssessmentCategory: string
{
    case Practical = 'practical';
    case Theory = 'theory';
    case Professional = 'professional';
}
