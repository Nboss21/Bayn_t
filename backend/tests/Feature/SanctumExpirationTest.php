<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SanctumExpirationTest extends TestCase
{
    use RefreshDatabase;

    public function test_expired_sanctum_token_cannot_access_authenticated_routes(): void
    {
        config(['sanctum.expiration' => 1]);

        $user = User::factory()->create([
            'role' => UserRole::REGISTRAR,
            'is_active' => true,
        ]);

        $token = $user->createToken('expiring-token')->plainTextToken;

        $this->travel(2)->minutes();

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/auth/me')
            ->assertUnauthorized();
    }
}
