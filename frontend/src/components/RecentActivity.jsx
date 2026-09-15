import React from 'react';

const activities = [
  { id: 1, text: "Amara Okafor submitted an application", time: "Today, 9:42 AM", color: "bg-green-600" },
  { id: 2, text: "Mekdes Tesfaye's payment was verified", time: "Today, 9:15 AM", color: "bg-green-600" },
  { id: 3, text: "Zainab Bello was approved", time: "Yesterday, 4:28 PM", color: "bg-yellow-600" },
  { id: 4, text: "Tulu Adeyemi was assigned to a class", time: "Yesterday, 2:10 PM", color: "bg-[#b45309]" },
  { id: 5, text: "Chloe Ezra was asked for info", time: "Yesterday, 11:40 AM", color: "bg-blue-600" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-semibold text-gray-900">Recent activity</h3>
        <button className="text-[13px] text-gray-500 hover:text-gray-700">View all</button>
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
