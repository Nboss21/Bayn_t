import React from 'react';
import { Folder, User, Clock, CheckSquare } from 'lucide-react';
import TeacherStatCard from '../../components/teacher/TeacherStatCard';
import TeacherAttentionItem from '../../components/teacher/TeacherAttentionItem';
import TeacherClassCard from '../../components/teacher/TeacherClassCard';
import TeacherChart from '../../components/teacher/TeacherChart';

const TeacherOverview = () => {
  return (
    <div className="pt-8">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[28px] font-medium text-[#1A1A1A] mb-1">Good morning, Hana</h1>
          <p className="text-[15px] text-gray-500">Here's what needs your attention today.</p>
        </div>
        <div className="text-[15px] text-gray-500">
          Monday, September 7, 2026
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <TeacherStatCard 
          title="CLASSES TODAY" 
          value="3" 
          subtitle="Assigned classes" 
          icon={<Folder className="w-4 h-4 text-gray-600" />}
          dotColor="bg-[#E5E5E5]"
        />
        <TeacherStatCard 
          title="STUDENTS" 
          value="18" 
          subtitle="Current students" 
          icon={<User className="w-4 h-4 text-gray-600" />}
          dotColor="bg-[#E5E5E5]"
        />
        <TeacherStatCard 
          title="ATTENDANCE" 
          value="1" 
          subtitle="Needs completion today" 
          badge={{ text: 'Pending', type: 'pending', icon: <Clock className="w-3 h-3 inline" /> }}
          dotColor="bg-[#D4A373]"
        />
        <TeacherStatCard 
          title="MARKS" 
          value="2" 
          subtitle="Assessments to complete" 
          badge={{ text: 'To Grade', type: 'pending', icon: <CheckSquare className="w-3 h-3 inline" /> }}
          dotColor="bg-[#D4A373]"
        />
      </div>

      {/* Needs your attention */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Needs your attention</h2>
        <div className="flex flex-col">
          <TeacherAttentionItem 
            type="Attendance"
            message="PMA Morning attendance is not completed."
            id="#62685F"
            buttonText="Take Attendance"
          />
          <TeacherAttentionItem 
            type="Marks"
            message="2 assessments are ready for mark entry."
            id="#62685F"
            buttonText="Enter Marks"
          />
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8 flex h-[260px]">
        <div className="w-[240px] pr-6 border-r border-gray-100 flex flex-col justify-center">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">Attendance this week</h2>
          <p className="text-[14px] text-gray-600 font-medium mb-3">PMA Morning</p>
          <p className="text-[13px] text-gray-400">Is attendance generally healthy this week?</p>
        </div>
        <div className="flex-1 pl-6">
          <TeacherChart />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">My Classes</h2>
          <div className="grid grid-cols-2 gap-6">
            <TeacherClassCard 
              title="PMA Morning"
              course="Professional Makeup Artistry"
              date="September 2026"
              time="Mon-Fri · 9:00 AM-12:00 PM"
              students="18/20 students"
              status="Attendance due"
              statusColor="text-[#D4A373]"
            />
            <TeacherClassCard 
              title="PMA Evening"
              course="Professional Makeup Artistry"
              date="September 2026"
              time="Mon-Fri · 5:30 PM-8:30 PM"
              students="19/20 students"
              status="Up to date"
              statusColor="text-gray-500"
            />
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-[268px] flex flex-col mt-[44px]">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-6">Assessment progress</h2>
            
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-[13px] text-gray-500 mb-1">Marks completed</div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">68%</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-gray-500 mb-1">Remaining</div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">32%</div>
              </div>
            </div>
            
            <div className="w-full bg-[#E5E5E5] rounded-full h-3 mb-6 flex overflow-hidden">
              <div className="bg-[#4A5D4E] h-full" style={{ width: '68%' }}></div>
              <div className="bg-[#E3E8DF] h-full" style={{ width: '32%' }}></div>
            </div>
            
            <p className="text-[13px] text-gray-500 mb-6 mt-auto">
              2 assessments still need completion.
            </p>
            
            <button className="w-full bg-[#4A5D4E] hover:bg-[#3D4C40] text-white text-[14px] font-medium py-2.5 rounded-md transition-colors">
              View Marks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;

