import React from 'react';
import { Link } from 'react-router-dom';

const RecentActivity = ({ activities, viewAllPath }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-semibold text-gray-900">Recent activity</h3>
        <Link to={viewAllPath} className="text-[13px] text-gray-500 hover:text-gray-700">View all</Link>
      </div>
      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-1">
              <div className={`w-2 h-2 rounded-full ${activity.color}`}></div>
            </div>
            <div>
              <p className="text-[13px] text-gray-800">{activity.text}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;