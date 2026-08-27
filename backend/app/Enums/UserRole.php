<?php

namespace App\Enums;

enum UserRole: string
{
    case SUPER_ADMIN = 'super_admin';
    case REGISTRAR = 'registrar';
    case TEACHER = 'teacher';
    case STUDENT = 'student';

    public function label(): string
    {
        return match ($this) {
            self::SUPER_ADMIN => 'Super Admin',
            self::REGISTRAR => 'Registrar',
            self::TEACHER => 'Teacher',
            self::STUDENT => 'Student',
        };
    }
}
