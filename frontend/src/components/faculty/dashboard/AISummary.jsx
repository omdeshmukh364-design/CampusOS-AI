import React from "react";
import { FaRobot } from "react-icons/fa";

const AISummary = ({ summary }) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <div className="flex items-center gap-3 mb-4">

                <FaRobot className="text-3xl text-indigo-600" />

                <h2 className="text-2xl font-bold">
                    AI Daily Summary
                </h2>

            </div>

            <ul className="space-y-3 text-gray-700">

                {summary.map((item, index) => (

                    <li key={index}>
                        📌 {item}
                    </li>

                ))}

            </ul>

        </div>

    );

};

export default AISummary;