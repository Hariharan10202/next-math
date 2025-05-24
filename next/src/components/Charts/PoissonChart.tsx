import { PoissonOutputSchema } from "@/schemas/output/root";
import { useEffect, useState } from "react";
import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  result: PoissonOutputSchema;
}

export default function PoissonChart({ result }: BarChartProps) {
  const [chartHeight, setChartHeight] = useState(500);

  const combinedData = result?.range.map((x, i) => ({
    x,
    observed: result.histogram[i] ?? 0,
    expected: result.pmfScaled[i] ?? 0,
  }));

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
      <div className="p-4  sm:p-8">
        <h2>Poisson Distribution</h2>
      </div>
      <ResponsiveContainer width={"100%"} height={chartHeight}>
        <ComposedChart data={combinedData}>
          <XAxis
            dataKey="x"
            label={{ value: "k", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Frequency", angle: -90, position: "insideLeft" }}
          />
          <Tooltip /> <Legend verticalAlign="top" height={66} />
          <Bar dataKey="observed" name="Simulated Calls" fill="skyblue" />
          <Line
            dataKey="expected"
            name="Poisson PMF (scaled)"
            stroke="red"
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
