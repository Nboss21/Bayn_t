import React from 'react';
import { Link } from 'react-router-dom';

const SummaryCard = ({ title, count, leftAction, rightAction, borderColor, textColor, path }) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-between shadow-sm border-t-2 ${borderColor}`}>
      <div>
        <h3 className="text-[13px] text-gray-500 mb-2">{title}</h3>
        <p className="text-4xl font-semibold text-gray-900">{count}</p>
      </div>
      <div className="flex items-center justify-between mt-8 text-[13px]">
        <span className={textColor}>{leftAction}</span>
        <Link to={path} className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
          {rightAction} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default SummaryCard;