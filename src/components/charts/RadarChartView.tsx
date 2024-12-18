import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "../../types/types";
import { CHART_COLORS } from "../../constants/chart";

interface RadarChartViewProps {
  data: ChartData[];
}

export const RadarChartView: React.FC<RadarChartViewProps> = ({ data }) => (
  <ResponsiveContainer>
    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis tickFormatter={(value) => `${value}m`} />
      <Radar
        name="Average Duration"
        dataKey="avgDuration"
        stroke={CHART_COLORS[0]}
        fill={CHART_COLORS[0]}
        fillOpacity={0.6}
      />
      <Tooltip
        formatter={(value) => [`${value} minutes`, "Average Duration"]}
      />
      <Legend />
    </RadarChart>
  </ResponsiveContainer>
);
