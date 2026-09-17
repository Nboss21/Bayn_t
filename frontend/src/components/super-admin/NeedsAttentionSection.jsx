import React from 'react';
import AttentionItem from './AttentionItem';
import { CreditCard, User, Users, FileText } from 'lucide-react';

const attentionItems = [
  {
    id: 1,
    title: 'Payment review',
    description: '3 payments need attention',
    badge: 'Pending Review',
    badgeStyle: 'bg-[#ffccb3] text-[#d97706]',
    icon: CreditCard,
    iconBg: 'bg-[#fcd3b6]',
    buttonText: 'Review Payments',
    link: '/super-admin/payments'
  },
  {
    id: 2,
    title: 'User access',
    description: '2 staff accounts are awaiting role assignment',
    badge: 'Awaiting Roles',
    badgeStyle: 'bg-[#e5e7eb] text-[#4b5563]',
    icon: User,
    iconBg: 'bg-[#bae6fd]', // Light blue
    buttonText: 'Review Users',
    link: '/super-admin/users'
  },
  {
    id: 3,
    title: 'Class capacity',
    description: '1 class is currently full',
    badge: 'At Capacity',
    badgeStyle: 'bg-[#e5e7eb] text-[#4b5563]',
    icon: Users,
    iconBg: 'bg-[#e5e7eb]',
    buttonText: 'View Classes',
    link: '/super-admin/classes'
  },
  {
    id: 4,
    title: 'Website content',
    description: '3 content updates are ready',
    badge: 'Published',
    badgeStyle: 'bg-[#dcfce7] text-[#166534]', // Light green
    icon: FileText,
    iconBg: 'bg-[#dcfce7]',
    buttonText: 'Open Content',
    link: '/super-admin/content'
  }
];

export default function NeedsAttentionSection() {
  return (
    <div className="mb-8 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Needs your attention</h2>
          <p className="text-sm text-[#6b7280]">A few items may need your review.</p>
        </div>
        <div className="text-sm text-[#6b7280]">4 pending items</div>
      </div>
      <div className="space-y-3">
        {attentionItems.map(item => (
          <AttentionItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
