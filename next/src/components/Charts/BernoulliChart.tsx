"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  result: {
    plotPoints: number[];
    dataPoints: number[];
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (result) {
      setIsLoading(true);
      const processedData = result?.plotPoints?.map((point, index) => ({
        point: `${point ? "1 (Sucess)" : "0 (Failure)"}`,
        value: result.dataPoints[index],
      }));

      setTransformedData(processedData);
      setIsLoading(false);
    }
  }, [result]);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(400);
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
      <div className="p-4 sm:p-8">
        <h2>Bernoulli Distribution</h2>
      </div>
      {!isLoading && transformedData.length ? (
        <ResponsiveContainer width={"100%"} height={chartHeight}>
          <BarChart
            data={transformedData}
            margin={{
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
            <XAxis
              dataKey="point"
              label={{
                value: "Binary Outcomes",
                offset: 0,
                position: "insideBottom",
                style: { fontSize: 12 },
              }}
              tick={{ fontSize: 11 }}
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
            <ReferenceLine
              y={0.5}
              stroke="red"
              strokeDasharray="3 3"
              label="Avg"
            />
            <Bar
              dataKey="value"
              fill="#69B3E7"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
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
