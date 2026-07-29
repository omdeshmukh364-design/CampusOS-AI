import React from "react";

import {

    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip

} from "recharts";

const data = [

    { name: "A Grade", value: 28 },

    { name: "B Grade", value: 36 },

    { name: "C Grade", value: 18 },

    { name: "Fail", value: 8 }

];

const colors = [

    "#16a34a",
    "#2563eb",
    "#eab308",
    "#dc2626"

];

const MarksChart = () => {

    return (

        <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-2xl font-bold mb-5">

                Marks Distribution

            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={100}
                    >

                        {

                            data.map((entry,index)=>(

                                <Cell
                                    key={index}
                                    fill={colors[index]}
                                />

                            ))

                        }

                    </Pie>

                    <Tooltip/>

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

};

export default MarksChart;