import React from 'react';
import AttentionItem from './AttentionItem';
import { CreditCard, User, Users, FileText } from 'lucide-react';

const iconMap = {
  creditCard: CreditCard,
  user: User,
  users: Users,
  fileText: FileText,
};

export default function NeedsAttentionSection({ items = [] }) {
  return (
    <div className="mb-8 mt-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">Needs your attention</h2>
          <p className="text-sm text-[#6b7280]">A few items may need your review.</p>
        </div>
        <div className="text-sm text-[#6b7280]">{items.length} pending items</div>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <AttentionItem
            key={item.id}
            icon={iconMap[item.iconType] || FileText}
            title={item.title}
            description={item.description}
            badge={item.badge}
            badgeStyle={item.badgeStyle}
            iconBg={item.iconBg}
            buttonText={item.buttonText}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
}
