import React, { useState } from "react";
import { PieChart as Chart } from "react-minimal-pie-chart";

interface ExpenseData {
  title: string;
  value: number;
  color: string;
}

interface Props {
  data: ExpenseData[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start w-full max-w-[500px] h-auto md:h-[500px] px-4 md:px-0 p-10 lg:ml-10 md:ml-10 sm:ml-10">
      <div className="relative w-full max-w-[300px] md:w-[300px] md:h-[300px]">
        <Chart
          data={data}
          animate
          animationDuration={500}
          animationEasing="ease-out"
          label={({ dataEntry }) => ` ${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: "6px",
            fontFamily: "sans-serif",
            fill: "#fff",
          }}
          labelPosition={60}
          onMouseOver={(_, index) => setHovered(index)}
          onMouseOut={() => setHovered(null)}
        />

        {hovered !== null && (
          <div
            className="absolute bottom-[-30px] left-1/2 -translate-x-1/2
                       bg-black bg-opacity-70 text-white
                       px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
          >
            {data[hovered].title}: {data[hovered].value}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-row md:flex-col gap-4 mt-6 md:mt-0 md:ml-10">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
