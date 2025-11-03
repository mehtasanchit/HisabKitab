import React from "react";

const StatCard = ({ title, value, icon: Icon, bgColor, textColor, subText }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200/50">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon className={`text-2xl ${textColor}`} />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {subText && <p className="text-xs text-gray-500 mt-1">{subText}</p>}
      </div>
    </div>
  );
};

export default StatCard;

