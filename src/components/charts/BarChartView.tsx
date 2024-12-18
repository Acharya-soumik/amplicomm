import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { ChartData } from "../../types/types";
import { CHART_COLORS } from "../../constants/chart";

interface BarChartViewProps {
  data: ChartData[];
}

export const BarChartView: React.FC<BarChartViewProps> = ({ data }) => (
  <ResponsiveContainer>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={(value) => `${value}m`} />
      <Tooltip formatter={(value) => [`${value} minutes`, "Duration"]} />
      <Legend />
      <Bar dataKey="duration" fill={CHART_COLORS[0]} name="Total Duration">
        <LabelList
          dataKey="duration"
          position="top"
          formatter={(value: string) => `${value}m`}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);
