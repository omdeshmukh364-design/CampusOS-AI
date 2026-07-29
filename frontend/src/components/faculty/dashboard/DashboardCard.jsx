import React from "react";

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-gray-500 text-sm">{title}</h4>

          <h2
            className={`text-3xl font-bold mt-2 ${color}`}
          >
            {value}
          </h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;