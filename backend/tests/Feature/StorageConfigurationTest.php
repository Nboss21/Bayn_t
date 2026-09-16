<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class StorageConfigurationTest extends TestCase
{
    public function test_private_and_public_disks_are_available_for_fake_storage(): void
    {
        Storage::fake('private_documents');
        Storage::fake('public_assets');

        Storage::disk('private_documents')->put('applications/example.txt', 'private');
        Storage::disk('public_assets')->put('gallery/example.txt', 'public');

        $this->assertTrue(Storage::disk('private_documents')->exists('applications/example.txt'));
        $this->assertTrue(Storage::disk('public_assets')->exists('gallery/example.txt'));
    }
}
