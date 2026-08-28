<?php

namespace App\Enums;

enum ProgramStatus: string
{
    case Draft = 'draft';
    case Open = 'open';
    case Closed = 'closed';
    case Archived = 'archived';
}
