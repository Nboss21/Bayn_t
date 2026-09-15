<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_request_password_reset_link(): void
    {
        User::factory()->create([
            'email' => 'reset@example.com',
            'password' => 'old-password',
        ]);

        $response = $this->postJson('/api/auth/forgot-password', [
            'email' => 'reset@example.com',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['message']);
    }

    public function test_forgot_password_requires_a_valid_email_address(): void
    {
        $this->postJson('/api/auth/forgot-password', [
            'email' => 'not-an-email',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }

    public function test_user_can_reset_password_with_valid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'reset@example.com',
            'password' => 'old-password',
        ]);

        $token = Password::broker()->createToken($user);

        $response = $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'token' => $token,
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertOk()
            ->assertJsonStructure(['message']);

        $this->assertTrue(Hash::check('new-password', $user->fresh()->password));
    }

    public function test_user_cannot_reset_password_with_invalid_token(): void
    {
        $user = User::factory()->create([
            'email' => 'reset@example.com',
            'password' => 'old-password',
        ]);

        $response = $this->postJson('/api/auth/reset-password', [
            'email' => $user->email,
            'token' => 'not-a-valid-token',
            'password' => 'new-password',
            'password_confirmation' => 'new-password',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['email']);
    }
}
