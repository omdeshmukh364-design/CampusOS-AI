import React from "react";
import {
    FaClipboardCheck,
    FaBullhorn,
    FaRobot,
    FaPlus
} from "react-icons/fa";

const actions = [
    {
        title: "Mark Attendance",
        icon: <FaClipboardCheck />,
        color: "bg-green-500"
    },
    {
        title: "Post Notice",
        icon: <FaBullhorn />,
        color: "bg-blue-500"
    },
    {
        title: "Create Assignment",
        icon: <FaPlus />,
        color: "bg-purple-500"
    },
    {
        title: "Open AI Assistant",
        icon: <FaRobot />,
        color: "bg-orange-500"
    }
];

const QuickActions = () => {
    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-6">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                {actions.map((action, index) => (

                    <button
                        key={index}
                        className={`${action.color} text-white rounded-xl p-5 hover:scale-105 transition-all duration-300`}
                    >
                        <div className="text-3xl mb-3">
                            {action.icon}
                        </div>

                        <h3 className="font-semibold">
                            {action.title}
                        </h3>

                    </button>

                ))}

            </div>

        </div>

    );
};

export default QuickActions;