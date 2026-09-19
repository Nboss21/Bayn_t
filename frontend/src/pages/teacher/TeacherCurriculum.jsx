import React, { useState, useCallback, useMemo } from 'react';
import CurriculumHeader from '../../components/teacher/curriculum/CurriculumHeader';
import CurriculumBanner from '../../components/teacher/curriculum/CurriculumBanner';
import CurriculumFilter from '../../components/teacher/curriculum/CurriculumFilter';
import TeachingContextCard from '../../components/teacher/curriculum/TeachingContextCard';
import ProgressCard from '../../components/teacher/curriculum/ProgressCard';
import ModuleSequence from '../../components/teacher/curriculum/ModuleSequence';
import useTeacherCurriculum from '../../hooks/useTeacherCurriculum';
import TeacherClassSelector from '../../components/teacher/TeacherClassSelector';

const TeacherCurriculum = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const { curriculumModel, loading } = useTeacherCurriculum(selectedClassId);

  React.useEffect(() => {
    if (!selectedClassId && curriculumModel?.availableClasses?.[0]) setSelectedClassId(curriculumModel.availableClasses[0].id);
  }, [curriculumModel, selectedClassId]);

  const [activeProgramId, setActiveProgramId] = useState(null);
  const [activeType, setActiveType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedModuleIds, setExpandedModuleIds] = useState(new Set());

  const resolvedProgramId = activeProgramId ?? curriculumModel?.activeProgramId;

  const filteredModules = useMemo(() => {
    if (!curriculumModel) return [];
    return curriculumModel.filterModules(activeType, searchQuery);
  }, [curriculumModel, activeType, searchQuery]);

  const handleToggleModule = useCallback((moduleNumber) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      if (next.has(moduleNumber)) {
        next.delete(moduleNumber);
      } else {
        next.add(moduleNumber);
      }
      return next;
    });
  }, []);

  const handleViewModule = useCallback((moduleNumber) => {
    setExpandedModuleIds((prev) => {
      const next = new Set(prev);
      next.add(moduleNumber);
      return next;
    });
    setTimeout(() => {
      document.getElementById(`module-${moduleNumber}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }, []);

  if (loading || !curriculumModel) {
    return (
      <div className="w-full">
        <div className="h-8 w-40 bg-gray-100 rounded mb-3 animate-pulse"></div>
        <div className="h-4 w-96 bg-gray-100 rounded mb-8 animate-pulse"></div>
        <div className="h-12 w-full bg-gray-100 rounded-xl mb-8 animate-pulse"></div>
        <div className="h-10 w-48 bg-gray-100 rounded-lg mb-6 animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
          <div className="h-52 bg-gray-100 rounded-2xl animate-pulse"></div>
          <div className="h-52 bg-gray-100 rounded-2xl animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TeacherClassSelector classes={curriculumModel.availableClasses} value={selectedClassId} onChange={setSelectedClassId} />
      <CurriculumHeader header={curriculumModel.header} />

      <CurriculumBanner banner={curriculumModel.banner} />

      <CurriculumFilter
        programs={curriculumModel.programs}
        activeProgramId={resolvedProgramId}
        onProgramChange={setActiveProgramId}
        filterTabs={curriculumModel.filterTabs}
        tabCounts={curriculumModel.tabCounts}
        activeType={activeType}
        onTypeChange={setActiveType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
        <TeachingContextCard
          teachingContext={curriculumModel.teachingContext}
          onViewModule={handleViewModule}
        />
        <ProgressCard progress={curriculumModel.progress} />
      </div>

      <ModuleSequence
        totalModules={curriculumModel.modulesCount}
        filteredCount={filteredModules.length}
        modules={filteredModules}
        expandedModuleIds={expandedModuleIds}
        onToggleModule={handleToggleModule}
      />
    </div>
  );
};

export default TeacherCurriculum;
