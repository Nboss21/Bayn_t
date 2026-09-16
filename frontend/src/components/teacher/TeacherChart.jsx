import React from 'react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomDot = (props) => {
  const { cx, cy, value } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} stroke="#4A5D4E" strokeWidth={2} fill="white" />
      <text x={cx} y={cy - 15} textAnchor="middle" fill="#1A1A1A" fontSize="12" fontWeight="500">
        {value === 94 ? 'Mon 94%' : `${value}%`}
      </text>
    </g>
  );
};

const TeacherChart = ({ data }) => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 30, right: 20, left: 20, bottom: 0 }}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#8C8C8C', fontSize: 12 }} 
            dy={10}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#4A5D4E" 
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      {/* Dashed background lines */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pt-[40px] pb-[30px] px-8">
        <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
        <div className="border-t border-dashed border-gray-200 w-full h-0"></div>
      </div>
    </div>
  );
};

export default TeacherChart;

