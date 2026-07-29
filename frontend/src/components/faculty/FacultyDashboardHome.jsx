import { useEffect, useState } from "react";
import FacultyNavbar from "../components/faculty/FacultyNavbar";
import FacultySidebar from "../components/faculty/FacultySidebar";
import Card from "../components/common/Card";
import { getFacultyInsights } from "../services/facultyAPI";
import React, { useEffect, useState } from "react";

import DashboardCards from "./DashboardCards";
import AISummary from "./AISummary";
import TimetableWidget from "./TimetableWidget";
import AlertsWidget from "./AlertsWidget";
import QuickActions from "./QuickActions";
import AttendanceChart from "./AttendanceChart";
import MarksChart from "./MarksChart";

import { getFacultyInsights } from "../../../services/facultyAPI";

const FacultyDashboardHome = () => {

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load dashboard when page opens
    useEffect(() => {
        loadDashboard();
    }, []);

    // Call backend API
    const loadDashboard = async () => {
        try {
            const response = await getFacultyInsights("faculty001");
            setDashboardData(response);
        } catch (error) {
            console.error("Dashboard Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Show loading while fetching data
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <h2 className="text-2xl font-semibold">
                    Loading Faculty Dashboard...
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome Back 👋
                </h1>

                <p className="text-gray-500 mt-2">
                    Here's what needs your attention today.
                </p>
            </div>

            {/* Statistics */}
            <DashboardCards data={dashboardData} />

            {/* AI Summary */}
            <div className="mt-8">
                <AISummary summary={dashboardData.summary} />
            </div>

            {/* Timetable + Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                <TimetableWidget timetable={dashboardData.timetable} />

                <AlertsWidget alerts={dashboardData.alerts} />

            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <QuickActions />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <AttendanceChart />
                <MarksChart />
            </div>

        </div>
    );
};

export default FacultyDashboardHome;