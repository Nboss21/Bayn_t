import React from 'react';
import { Link } from 'react-router-dom';

const TeacherAttentionItem = ({ type, message, id, buttonText, path }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-16 w-full">
        <span className="text-[14px] font-medium text-[#1A1A1A] w-24">{type}</span>
        <span className="text-[14px] text-gray-500 flex-1">{message}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-[12px] text-gray-400 font-mono">{id}</span>
        <Link
          to={path}
          className="bg-[#4A5D4E] hover:bg-[#3D4C40] text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default TeacherAttentionItem;

