import React from "react";

const AlertsWidget = ({ alerts }) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-4">

                Pending Alerts

            </h2>

            <div className="space-y-4">

                {alerts.map((alert, index) => (

                    <div
                        key={index}
                        className={
                            alert.type === "danger"
                                ? "bg-red-100 p-3 rounded"
                                : alert.type === "warning"
                                ? "bg-yellow-100 p-3 rounded"
                                : "bg-green-100 p-3 rounded"
                        }
                    >

                        {alert.message}

                    </div>

                ))}

            </div>

        </div>

    );

};

export default AlertsWidget;