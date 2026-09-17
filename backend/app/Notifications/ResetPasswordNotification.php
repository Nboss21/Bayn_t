<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Support\Facades\URL;

class ResetPasswordNotification extends BaseResetPassword
{
    /**
     * Build the mail representation of the notification.
     */
    public function toMail($notifiable): \Illuminate\Notifications\Messages\MailMessage
    {
        $frontendUrl = rtrim((string) env('FRONTEND_URL', 'http://localhost:5173'), '/');
        $resetUrl = sprintf(
            '%s/reset-password?token=%s&email=%s',
            $frontendUrl,
            urlencode($this->token),
            urlencode($notifiable->getEmailForPasswordReset())
        );

        return (new \Illuminate\Notifications\Messages\MailMessage)
            ->subject('Reset your password')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', $resetUrl)
            ->line('This password reset link will expire in '.config('auth.passwords.'.config('auth.defaults.passwords').'.expire').' minutes.')
            ->line('If you did not request a password reset, no further action is required.');
    }
}
