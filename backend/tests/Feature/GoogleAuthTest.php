<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Tests\TestCase;

class GoogleAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_callback_links_existing_user_without_creating_duplicate(): void
    {
        $user = User::factory()->create([
            'email' => 'linked@example.com',
            'role' => UserRole::TEACHER,
            'is_active' => true,
            'google_id' => null,
        ]);

        Socialite::shouldReceive('driver->stateless->user')
            ->andReturn($this->googleUser('google-123', 'Linked User', $user->email));

        $response = $this->getJson('/api/auth/google/callback');

        $response->assertOk()
            ->assertJsonPath('user.email', $user->email)
            ->assertJsonPath('user.role', UserRole::TEACHER->value);

        $this->assertDatabaseCount('users', 1);
        $this->assertSame('google-123', $user->fresh()->google_id);
    }

    public function test_google_callback_creates_new_student_user(): void
    {
        Socialite::shouldReceive('driver->stateless->user')
            ->andReturn($this->googleUser('google-456', 'New Student', 'new-google@example.com'));

        $response = $this->getJson('/api/auth/google/callback');

        $response->assertOk()
            ->assertJsonPath('user.email', 'new-google@example.com')
            ->assertJsonPath('user.role', UserRole::STUDENT->value)
            ->assertJsonStructure(['message', 'access_token', 'token_type', 'user']);

        $this->assertDatabaseHas('users', [
            'email' => 'new-google@example.com',
            'google_id' => 'google-456',
            'role' => UserRole::STUDENT->value,
            'is_active' => true,
        ]);
    }

    public function test_google_callback_rejects_cancelled_oauth_attempts(): void
    {
        $this->getJson('/api/auth/google/callback?error=access_denied')
            ->assertUnprocessable()
            ->assertJson([
                'message' => 'Google authentication was cancelled or denied.',
            ]);
    }

    public function test_google_callback_rejects_inactive_existing_users(): void
    {
        User::factory()->create([
            'email' => 'inactive@example.com',
            'role' => UserRole::STUDENT,
            'is_active' => false,
        ]);

        Socialite::shouldReceive('driver->stateless->user')
            ->andReturn($this->googleUser('google-999', 'Inactive User', 'inactive@example.com'));

        $this->getJson('/api/auth/google/callback')
            ->assertForbidden()
            ->assertJson([
                'message' => 'Your account has been deactivated. Please contact administrator.',
            ]);
    }

    private function googleUser(string $id, string $name, string $email): SocialiteUser
    {
        return SocialiteUser::fake([
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'avatar' => 'https://example.com/avatar.png',
        ]);
    }
}
