import React from "react";

import DashboardCard from "./DashboardCard";

import {
    FaUserCheck,
    FaClipboardCheck,
    FaBookOpen,
    FaCalendarAlt
} from "react-icons/fa";

const DashboardCards = ({ data }) => {

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <DashboardCard
                title="Attendance"
                value={`${data.attendance}%`}
                color="text-green-600"
                icon={<FaUserCheck className="text-green-600" />}
            />

            <DashboardCard
                title="Average Marks"
                value={`${data.avgMarks}%`}
                color="text-blue-600"
                icon={<FaClipboardCheck className="text-blue-600" />}
            />

            <DashboardCard
                title="Pending Grading"
                value={data.pendingGrading}
                color="text-red-600"
                icon={<FaBookOpen className="text-red-600" />}
            />

            <DashboardCard
                title="Today's Classes"
                
                color="text-purple-600"
                icon={<FaCalendarAlt className="text-purple-600" />}
            />

        </div>

    );

};

export default DashboardCards;