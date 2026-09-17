<?php

namespace App\Http\Controllers\Api;

use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\{AuditLog, Payment, Program, SchoolClass, Student, User};
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $activities = AuditLog::query()
            ->with('actor')
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn (AuditLog $log) => [
                'id' => $log->id,
                'title' => str($log->action)->replace('_', ' ')->title()->toString(),
                'description' => trim(($log->actor?->name ? $log->actor->name.' ' : '').str($log->target_type)->afterLast('\\')->toString()),
                'time' => $log->created_at?->diffForHumans(),
                'dotColor' => 'bg-[#d1d5db]',
            ]);

        $pendingPayments = Payment::where('status', PaymentStatus::Pending)->count();
        $activeStaff = User::where('is_active', true)->where('role', '!=', 'student')->count();
        $activeStudents = Student::where('status', 'active')->count();
        $activeClasses = SchoolClass::count();
        $activePrograms = Program::where('status', 'open')->count();

        return response()->json(['data' => [
            'user' => ['name' => auth()->user()->name],
            'stats' => [
                ['id' => 'users', 'title' => 'USERS', 'value' => $activeStaff, 'subtitle' => 'Active staff accounts'],
                ['id' => 'programs', 'title' => 'PROGRAMS', 'value' => $activePrograms, 'subtitle' => 'Active programs'],
                ['id' => 'classes', 'title' => 'CLASSES', 'value' => $activeClasses, 'subtitle' => 'Active classes'],
                ['id' => 'payments', 'title' => 'PAYMENTS', 'value' => $pendingPayments, 'subtitle' => 'Need attention', 'badge' => $pendingPayments ? 'Action Needed' : null, 'subtitleDot' => $pendingPayments ? 'bg-[#ef4444]' : null],
            ],
            'attentionItems' => $pendingPayments ? [[
                'id' => 'payments', 'title' => 'Payment review', 'description' => $pendingPayments.' payments need attention',
                'badge' => 'Pending Review', 'badgeStyle' => 'bg-[#ffccb3] text-[#d97706]', 'iconType' => 'creditCard', 'iconBg' => 'bg-[#fcd3b6]',
                'buttonText' => 'Review Payments', 'link' => '/super-admin/payments',
            ]] : [],
            'quickActions' => [
                ['name' => 'Manage Users', 'iconType' => 'users', 'path' => '/super-admin/users'],
                ['name' => 'Manage Programs', 'iconType' => 'bookOpen', 'path' => '/super-admin/programs'],
                ['name' => 'Manage Classes', 'iconType' => 'calendar', 'path' => '/super-admin/classes'],
                ['name' => 'Review Payments', 'iconType' => 'creditCard', 'path' => '/super-admin/payments'],
            ],
            'activities' => $activities,
            'atelierStatus' => ['activeStudents' => $activeStudents, 'activeClasses' => $activeClasses],
        ]]);
    }
}