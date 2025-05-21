import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface NormalChartProps {
  result: {
    histogram: { x: GLfloat; y: GLfloat }[];
    pdf_curve: { x: GLfloat; y: GLfloat }[];
  };
}

const mergeData = (
  histogram: NormalChartProps["result"]["histogram"] = [],
  pdf_curve: NormalChartProps["result"]["pdf_curve"] = []
) => {
  const merged: { x: number; histogram: number; pdf: number }[] = [];

  const binWidth = 0.1;

  for (const { x, y } of histogram) {
    merged.push({ x, histogram: y, pdf: 0 });
  }

  for (const { x: px, y: py } of pdf_curve) {
    const existing = merged.find(({ x }) => Math.abs(x - px) < binWidth);
    if (existing) {
      existing.pdf = py;
    } else {
      merged.push({ x: px, histogram: 0, pdf: py });
    }
  }

  return merged.sort((a, b) => a.x - b.x);
};

const NormalDistributionChart = ({ result }: NormalChartProps) => {
  const [chartHeight, setChartHeight] = useState(500);

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

  const chartData = mergeData(result.histogram, result.pdf_curve);

  const hasData =
    result?.histogram?.length > 0 && result?.pdf_curve?.length > 0;

  return (
    <div>
      <div className="p-4  sm:p-8">
        <h2>Normal Distribution of Test Scores</h2>
      </div>
      {hasData ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              label={{
                value: "Test Score",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{ value: "Density", angle: -90, position: "insideLeft" }}
              allowDecimals={true}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={66} />
            <Bar
              dataKey="histogram"
              fill="#8884d8"
              name="Histogram"
              barSize={20}
            />
            <Line
              dataKey="pdf"
              stroke="#ff7300"
              strokeWidth={2}
              dot={false}
              name="Normal Curve"
              type="monotone"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div>No data to display</div>
      )}
    </div>
  );
};
export default NormalDistributionChart;
