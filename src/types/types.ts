export interface Activity {
  id: string;
  name: string;
  duration: number;
  date: string;
}

export interface ChartData {
  name: string;
  duration: number;
  count: number;
  avgDuration: number;
}

export interface DailyData {
  date: string;
  total: number;
  [key: string]: number | string;
}

export type ChartType = "pie" | "bar" | "radar" | "daily";
