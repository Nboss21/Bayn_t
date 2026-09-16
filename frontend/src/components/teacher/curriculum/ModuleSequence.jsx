import React from 'react';
import ModuleCard from './ModuleCard';

const ModuleSequence = ({ totalModules, filteredCount, modules, expandedModuleIds, onToggleModule }) => {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#1A1A1A]">
          Module Sequence ({filteredCount} {filteredCount === totalModules ? `of ${totalModules}` : ''} Total)
        </h2>
        <span className="text-[13px] text-gray-500">Ordered sequence for certificate qualification</span>
      </div>
      
      <div className="flex flex-col gap-3">
        {modules.length > 0 ? (
          modules.map((module) => (
            <div key={module.id} id={`module-${module.number}`}>
              <ModuleCard
                module={module}
                expanded={expandedModuleIds.has(module.number)}
                onToggle={() => onToggleModule(module.number)}
              />
            </div>
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-[15px] text-gray-500">No modules match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleSequence;