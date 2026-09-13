<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['institution_name', 'logo_path', 'contact_email', 'phone', 'address', 'social_links', 'about_text', 'footer_text'];
    protected function casts(): array { return ['social_links' => 'array']; }
}
