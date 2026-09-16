import React from 'react';
import TeacherClassesFilterBar from '../../components/teacher/TeacherClassesFilterBar';
import TeacherAttentionBanner from '../../components/teacher/TeacherAttentionBanner';
import TeacherClassCard from '../../components/teacher/TeacherClassCard';

const TeacherClasses = () => {
  const classes = [
    {
      id: 1,
      program: 'PROFESSIONAL MAKEUP ARTISTRY',
      title: 'PMA Morning',
      date: 'September 2026',
      time: 'Mon-Fri · 9:00 AM-12:00 PM',
      studentsCount: 18,
      totalStudents: 20,
      status: 'Attendance due',
      seatsAvailable: 2,
      isFull: false,
    },
    {
      id: 2,
      program: 'PROFESSIONAL MAKEUP ARTISTRY',
      title: 'PMA Afternoon',
      date: 'September 2026',
      time: 'Mon-Fri · 2:00 PM-5:00 PM',
      studentsCount: 20,
      totalStudents: 20,
      status: 'Up to date',
      seatsAvailable: 0,
      isFull: true,
    },
    {
      id: 3,
      program: 'PROFESSIONAL MAKEUP ARTISTRY',
      title: 'PMA Evening',
      date: 'September 2026',
      time: 'Mon-Fri · 5:30 PM-8:30 PM',
      studentsCount: 19,
      totalStudents: 20,
      status: 'Up to date',
      seatsAvailable: 1,
      isFull: false,
    }
  ];

  return (
    <div className="pt-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-[32px] font-semibold text-[#1A1A1A] mb-2">My Classes</h1>
          <p className="text-[15px] text-gray-500">View your assigned classes, schedules, and students.</p>
        </div>
        <div className="bg-[#EEF1EB] text-[#4A5D4E] font-medium text-[13px] px-4 py-2 rounded-full">
          3 assigned classes
        </div>
      </div>

      {/* Filters */}
      <TeacherClassesFilterBar />

      {/* Needs Attention Banner */}
      <TeacherAttentionBanner />

      {/* Classes Grid Section */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-[20px] font-semibold text-[#1A1A1A] mb-1">Your assigned classes</h2>
          <p className="text-[14px] text-gray-500">Open a class to view its students and classroom tasks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <TeacherClassCard
              key={cls.id}
              program={cls.program}
              title={cls.title}
              date={cls.date}
              time={cls.time}
              studentsCount={cls.studentsCount}
              totalStudents={cls.totalStudents}
              status={cls.status}
              seatsAvailable={cls.seatsAvailable}
              isFull={cls.isFull}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherClasses;

