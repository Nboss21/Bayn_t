<?php

namespace App\Enums;

enum DocumentType: string
{
    case IdPhoto = 'id_photo';
    case RegistrationDoc = 'registration_doc';
    case Receipt = 'receipt';
    case Certificate = 'certificate';
    case Other = 'other';
}
