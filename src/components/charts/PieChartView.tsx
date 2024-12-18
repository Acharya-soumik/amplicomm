import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { ChartData } from "../../types/types";
import { CHART_COLORS } from "../../constants/chart";

interface PieChartViewProps {
  data: ChartData[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${value}m (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export const PieChartView: React.FC<PieChartViewProps> = ({ data }) => (
  <ResponsiveContainer>
    <PieChart>
      <Pie
        data={data}
        dataKey="duration"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        label={renderCustomizedLabel}
      >
        {data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={CHART_COLORS[index % CHART_COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip formatter={(value) => `${value} minutes`} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);
