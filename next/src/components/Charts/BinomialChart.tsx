"use client";

import { BernoulliAndBinomialOutputSchema } from "@/schemas/output/root";
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
  result: BernoulliAndBinomialOutputSchema;
}

export default function BinomialChart({ result }: BarChartProps) {
  const [transformedData, setTransformedData] = useState<
    { point: number; value: number }[]
  >([]);

  const [chartHeight, setChartHeight] = useState(500);

  useEffect(() => {
    if (result.type === "binomial") {
      const processedData = result?.plotPoints?.map((point, index) => ({
        point,
        value: result.dataPoints[index],
      }));
      setTransformedData(processedData);
    } else {
      setTransformedData([]);
    }
  }, [result]);

  useEffect(() => {
    // Adjust height based on screen size
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
        <h2>Binomial Distribution</h2>
      </div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={transformedData}
          margin={{
            right: 0,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="point"
            label={{
              value: "n Trials",
              position: "insideBottom",
              offset: 0,
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
    </div>
  );
}
