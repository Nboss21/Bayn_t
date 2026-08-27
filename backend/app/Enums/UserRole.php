<?php

namespace App\Enums;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Registrar = 'registrar';
    case Teacher = 'teacher';
    case Student = 'student';
}
