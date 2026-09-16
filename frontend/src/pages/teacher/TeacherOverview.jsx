import React from 'react';
import { Link } from 'react-router-dom';
import { Folder, User, Clock, CheckSquare } from 'lucide-react';
import TeacherStatCard from '../../components/teacher/TeacherStatCard';
import TeacherAttentionItem from '../../components/teacher/TeacherAttentionItem';
import TeacherClassCard from '../../components/teacher/TeacherClassCard';
import TeacherChart from '../../components/teacher/TeacherChart';
import useTeacherOverview from '../../hooks/useTeacherOverview';

const iconMap = {
  folder: <Folder className="w-4 h-4 text-gray-600" />,
  user: <User className="w-4 h-4 text-gray-600" />,
  clock: <Clock className="w-3 h-3 inline" />,
  checkSquare: <CheckSquare className="w-3 h-3 inline" />,
};

const TeacherOverview = () => {
  const { overview, loading } = useTeacherOverview();

  if (loading || !overview) {
    return (
      <div>
        <div className="h-8 w-72 bg-gray-100 rounded mb-4 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-100 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[140px] bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[28px] font-medium text-[#1A1A1A] mb-1">{overview.greeting}</h1>
          <p className="text-[15px] text-gray-500">Here's what needs your attention today.</p>
        </div>
        <div className="text-[15px] text-gray-500">
          {today}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {overview.stats.map((stat) => (
          <TeacherStatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={iconMap[stat.iconType]}
            dotColor={stat.dotColor}
            badge={stat.badge ? {
              text: stat.badge.text,
              type: stat.badge.type,
              icon: iconMap[stat.badge.iconType],
            } : undefined}
          />
        ))}
      </div>

      {/* Needs your attention */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8">
        <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">Needs your attention</h2>
        <div className="flex flex-col">
          {overview.attentionItems.map((item) => (
            <TeacherAttentionItem
              key={item.id}
              type={item.type}
              message={item.message}
              id={item.refId}
              buttonText={item.buttonText}
              path={item.path}
            />
          ))}
        </div>
      </div>

      {/* Attendance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-8 flex h-[260px]">
        <div className="w-[240px] pr-6 border-r border-gray-100 flex flex-col justify-center">
          <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-1">{overview.attendanceChart.title}</h2>
          <p className="text-[14px] text-gray-600 font-medium mb-3">{overview.attendanceChart.className}</p>
          <p className="text-[13px] text-gray-400">{overview.attendanceChart.subtitle}</p>
        </div>
        <div className="flex-1 pl-6">
          <TeacherChart data={overview.attendanceChart.data} />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-4">My Classes</h2>
          <div className="grid grid-cols-2 gap-6">
            {overview.classes.map((cls) => (
              <TeacherClassCard
                key={cls.id}
                program={cls.program}
                title={cls.title}
                date={cls.date}
                time={cls.time}
                studentsCount={cls.studentsCount}
                totalStudents={cls.totalStudents}
                seatsAvailable={cls.seatsAvailable}
                isFull={cls.isFull}
                status={cls.status}
                path={cls.path}
              />
            ))}
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-[268px] flex flex-col mt-[44px]">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-6">Assessment progress</h2>
            
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-[13px] text-gray-500 mb-1">Marks completed</div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">{overview.assessmentProgress.marksCompletedPercent}%</div>
              </div>
              <div className="text-right">
                <div className="text-[13px] text-gray-500 mb-1">Remaining</div>
                <div className="text-[20px] font-semibold text-[#1A1A1A]">{overview.assessmentProgress.remainingPercent}%</div>
              </div>
            </div>
            
            <div className="w-full bg-[#E5E5E5] rounded-full h-3 mb-6 flex overflow-hidden">
              <div className="bg-[#4A5D4E] h-full" style={{ width: `${overview.assessmentProgress.marksCompletedPercent}%` }}></div>
              <div className="bg-[#E3E8DF] h-full" style={{ width: `${overview.assessmentProgress.remainingPercent}%` }}></div>
            </div>
            
            <p className="text-[13px] text-gray-500 mb-6 mt-auto">
              {overview.assessmentProgress.remainingText}
            </p>
            
            <Link
              to={overview.assessmentProgress.viewMarksPath}
              className="w-full bg-[#4A5D4E] hover:bg-[#3D4C40] text-white text-[14px] font-medium py-2.5 rounded-md transition-colors text-center block"
            >
              View Marks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherOverview;
