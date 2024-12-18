import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DailyData } from "../../types/types";
import { CHART_COLORS } from "../../constants/chart";

interface DailyChartViewProps {
  data: DailyData[];
}

export const DailyChartView: React.FC<DailyChartViewProps> = ({ data }) => {
  const activities = Array.from(
    new Set(
      data.flatMap((day) =>
        Object.keys(day).filter((key) => key !== "date" && key !== "total")
      )
    )
  );

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `${value}m`} />
        <Tooltip
          formatter={(value) => [`${value} minutes`, "Duration"]}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        {activities.map((activity, index) => (
          <Bar
            key={activity}
            dataKey={activity}
            stackId="a"
            fill={CHART_COLORS[index % CHART_COLORS.length]}
            name={activity}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
