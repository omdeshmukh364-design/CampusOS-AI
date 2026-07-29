import React from "react";

const TimetableWidget = ({ timetable }) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">
                Today's Timetable
            </h2>

            {timetable.map((item, index) => (

                <div
                    key={index}
                    className="border-b py-3 flex justify-between"
                >

                    <div>

                        <h4 className="font-semibold">
                            {item.subject}
                        </h4>

                        <p className="text-gray-500">
                            {item.time}
                        </p>

                    </div>

                    <span className="text-blue-600">
                        {item.room}
                    </span>

                </div>

            ))}

        </div>

    );

};

export default TimetableWidget;