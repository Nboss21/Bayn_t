import React from 'react';
import { Users, BookOpen, Calendar, CreditCard, FileText, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickActions = [
  { name: 'Manage Users', icon: Users, path: '/super-admin/users' },
  { name: 'Manage Programs', icon: BookOpen, path: '/super-admin/programs' },
  { name: 'Manage Classes', icon: Calendar, path: '/super-admin/classes' },
  { name: 'Review Payments', icon: CreditCard, path: '/super-admin/payments' },
  { name: 'Manage Content', icon: FileText, path: '/super-admin/content' },
  { name: 'Open Settings', icon: Settings, path: '/super-admin/settings' },
];

export default function QuickManagementSection() {
  return (
    <div className="mb-8 mt-10">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-[#111827]">Quick management</h2>
        <p className="text-sm text-[#6b7280]">Go directly to the areas you manage most often.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className="flex items-center justify-between p-4 bg-white border border-[#f3f4f6] rounded-xl hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all group shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f3f4f6] flex items-center justify-center group-hover:bg-[#e5e7eb] transition-colors">
                  <Icon className="w-4 h-4 text-[#4b5563]" />
                </div>
                <span className="font-medium text-[#111827]">{action.name}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#9ca3af] group-hover:text-[#4b5563] transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
