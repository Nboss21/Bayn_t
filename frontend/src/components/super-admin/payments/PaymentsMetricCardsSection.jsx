import React from 'react';
import { CreditCard } from 'lucide-react';

export default function PaymentsMetricCardsSection() {
  const cards = [
    {
      title: 'Payments received',
      dotColor: 'bg-[#487a55]',
      value: '18',
      subtitle: 'Recent payments',
    },
    {
      title: 'Payment pending',
      dotColor: 'bg-[#e5a656]',
      value: '3',
      subtitle: 'Awaiting payment',
    },
    {
      title: 'Needs attention',
      dotColor: 'bg-[#8c593b]',
      value: '3',
      subtitle: 'Require review',
    },
    {
      title: 'Payment records',
      icon: CreditCard,
      value: '24',
      subtitle: 'Recent records',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-5 border border-[#e8eadf] shadow-xs flex flex-col justify-between h-[130px] transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#6b7280]">
              {card.title}
            </span>
            {card.dotColor && (
              <span className={`w-2.5 h-2.5 rounded-full ${card.dotColor}`} />
            )}
            {card.icon && (
              <card.icon className="w-4 h-4 text-[#9ca3af]" />
            )}
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-extrabold text-[#111827] tracking-tight">
              {card.value}
            </span>
            <span className="text-[11px] text-[#9ca3af] font-normal">
              {card.subtitle}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
