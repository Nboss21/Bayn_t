import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  FileText, 
  Users, 
  CheckSquare, 
  BookOpen, 
  Clock, 
  Bell, 
  Settings,
  ChevronDown
} from 'lucide-react';

const TeacherSidebar = () => {
  const navItems = [
    { name: 'Overview', path: '/teacher/overview', icon: <LayoutGrid className="w-5 h-5" /> },
    { name: 'My Classes', path: '/teacher/classes', icon: <FileText className="w-5 h-5" /> },
    { name: 'Attendance', path: '/teacher/attendance', icon: <Users className="w-5 h-5" />, badge: '1' },
    { name: 'Marks', path: '/teacher/marks', icon: <CheckSquare className="w-5 h-5" /> },
    { name: 'Curriculum & Modules', path: '/teacher/curriculum', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Student Roster', path: '/teacher/roster', icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-[240px] h-screen bg-[#F0F4EC] border-r border-[#E0E7D9] flex flex-col fixed left-0 top-0 text-[#1A1A1A]">
      <div className="p-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <h1 className="font-serif text-3xl tracking-widest text-[#1D1610]">HOB</h1>
          <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1">International Academy</p>
        </div>

        {/* Workspace Dropdown */}
        <div className="mb-6">
          <p className="text-[10px] uppercase font-semibold text-gray-500 mb-2 tracking-wider">Workspace</p>
          <button className="flex items-center justify-between w-full text-left text-[14px] font-medium p-1 hover:bg-[#E3E9DA] rounded transition-colors">
            Teacher Workspace
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                  isActive ? 'bg-[#CFDEC0] text-[#1A1A1A]' : 'text-gray-700 hover:bg-[#E3E9DA]'
                }`
              }
            >
              <span className="text-gray-600">{item.icon}</span>
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span className="bg-[#F8C1A0] text-[#1A1A1A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-gray-700 hover:bg-[#E3E9DA] rounded-lg text-[14px] font-medium transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="flex-1">Notifications</span>
          <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-gray-700 hover:bg-[#E3E9DA] rounded-lg text-[14px] font-medium transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
          <span>Profile & Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;

