import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Globe, 
  Settings, 
  Bell, 
  Eye, 
  Edit3 
} from 'lucide-react';
import PermissionSection from './PermissionSection';

export default function RoleDetails() {
  const permissionsData = [
    {
      icon: Users,
      title: "PEOPLE & ACCESS",
      subtitle: "Account & Authorization",
      items: [
        {
          name: "Users",
          description: "Staff account, directory, role assignment, and credentials.",
          view: true,
          manage: true
        },
        {
          name: "Roles & Permissions",
          description: "Global security scopes, access policy, and role capabilities.",
          view: true,
          manage: true
        }
      ]
    },
    {
      icon: BookOpen,
      title: "ACADEMIC MANAGEMENT",
      subtitle: "Programs, Classes & Standards",
      items: [
        {
          name: "Programs",
          description: "Official diploma curriculum, requirements, and course details.",
          view: true,
          manage: true
        },
        {
          name: "Classes & Intakes",
          description: "Cohort schedules, classroom capacities, and intake calendars.",
          view: true,
          manage: true
        },
        {
          name: "Grading",
          description: "Assessment schemes, passing thresholds, and official formulas.",
          view: true,
          manage: true
        },
        {
          name: "Reports",
          description: "Exportable school performance, student retention, and intake reports.",
          view: true,
          manage: true
        }
      ]
    },
    {
      icon: DollarSign,
      title: "FINANCE",
      subtitle: "Tuition & Ledger Oversight",
      items: [
        {
          name: "Payments",
          description: "Tuition transactions, payment verification, and receipt records.",
          view: true,
          manage: true
        }
      ]
    },
    {
      icon: Globe,
      title: "WEBSITE",
      subtitle: "Public Content & Assets",
      items: [
        {
          name: "Content",
          description: "Gallery photos, public course descriptions, and newsletter campaigns.",
          view: true,
          manage: true
        },
        {
          name: "Documents",
          description: "Official policies, student handbooks, forms, and certificate templates.",
          view: true,
          manage: true
        }
      ]
    },
    {
      icon: Settings,
      title: "SYSTEM",
      subtitle: "Core Platform Logs & Parameters",
      items: [
        {
          name: "Audit Log",
          description: "Chronological record of platform modifications and administrative actions.",
          badge: "Read-Only System",
          view: true,
          manage: false,
          manageDisabled: true
        },
        {
          name: "Settings",
          description: "Academy branding, academic calendar dates, and institution metadata.",
          view: true,
          manage: true
        }
      ]
    },
    {
      icon: Bell,
      title: "COMMUNICATION",
      subtitle: "Alerts & Broadcasts",
      items: [
        {
          name: "Notifications",
          description: "Broadcast academy announcements, staff alerts, and intake deadlines.",
          view: true,
          manage: true
        }
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Card */}
      <div className="bg-white border border-[#111827] rounded-xl p-5 shadow-sm mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-[20px] font-bold text-[#111827]">Super Admin permissions</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#ecfdf5] text-[11px] font-semibold text-[#059669]">
                All Scopes Enabled
              </span>
            </div>
            <p className="text-[13px] text-[#6b7280]">
              Review the access and actions available to this role.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-[#f9fafb] p-2 rounded-lg border border-[#f3f4f6]">
            <div className="flex items-center gap-2 pr-4 border-r border-[#e5e7eb]">
              <Eye className="w-4 h-4 text-[#6b7280]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#111827]">View</span>
                <span className="text-[9px] text-[#6b7280]">Can see info</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#6b7280]" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-[#111827]">Manage</span>
                <span className="text-[9px] text-[#6b7280]">Can create/edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Sections */}
      <div className="space-y-4">
        {permissionsData.map((section, index) => (
          <PermissionSection
            key={index}
            icon={section.icon}
            title={section.title}
            subtitle={section.subtitle}
            items={section.items}
          />
        ))}
      </div>

      {/* Footer Text Box */}
      <div className="bg-white border border-[#e5e7eb] rounded-xl px-5 py-4 shadow-sm mt-2 flex items-center">
        <span className="text-[12px] text-[#9ca3af]">Last verified: Today, 09:15 AM by Daniel</span>
      </div>
    </div>
  );
}
