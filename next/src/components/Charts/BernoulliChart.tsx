"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  result: {
    plotPoints: GLfloat[];
    dataPoints: GLfloat[];
  };
}

export default function BernoulliChart({ result }: BarChartProps) {
  const [transformedData, setTransformedData] = useState<
    {
      point: string;
      value: number;
    }[]
  >([]);

  const [chartHeight, setChartHeight] = useState(500);

  useEffect(() => {
    if (result) {
      const processedData = result.plotPoints.map((point, index) => ({
        point: `${point ? "1 (Sucess)" : "0 (Failure)"}`,
        value: result.dataPoints[index],
      }));
      setTransformedData(processedData);
    }
  }, [result]);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(200);
      } else {
        setChartHeight(500);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return (
    <div>
      {transformedData.length ? (
        <ResponsiveContainer width={"100%"} height={chartHeight}>
          <BarChart
            data={transformedData}
            margin={{
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="point"
              label={{
                value: "Binary Outcomes",
                position: "insideBottom",
                offset: -5,
                style: { fontSize: 12 },
              }}
            />
            <YAxis
              label={{
                value: "Probabilities",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fontSize: 12 },
              }}
            />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="#69B3E7"
              activeBar={<Rectangle fill="orange" stroke="black" />}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="font-bold text-center">No data found</div>
      )}
    </div>
  );
}
