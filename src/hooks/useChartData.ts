import { useMemo, useState } from "react";
import { Activity, ChartData, DailyData } from "../types/types";
import { DateRange } from "../components/charts/DateRangeSelector";

const filterActivitiesByDate = (
  activities: Activity[],
  range: DateRange,
  customRange?: { start: string; end: string }
) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const monthAgo = new Date(today);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  return activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    activityDate.setHours(0, 0, 0, 0);

    switch (range) {
      case "today":
        return activityDate.getTime() === today.getTime();
      case "week":
        return activityDate >= weekAgo;
      case "month":
        return activityDate >= monthAgo;
      case "custom":
        if (customRange?.start && customRange?.end) {
          const start = new Date(customRange.start);
          const end = new Date(customRange.end);
          return activityDate >= start && activityDate <= end;
        }
        return true;
      default:
        return true;
    }
  });
};

export const useChartData = (activities: Activity[]) => {
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [customRange, setCustomRange] = useState<{
    start: string;
    end: string;
  }>();

  const filteredActivities = useMemo(
    () => filterActivitiesByDate(activities, dateRange, customRange),
    [activities, dateRange, customRange]
  );

  const activityDurationData = useMemo(
    () =>
      filteredActivities
        .reduce((acc: ChartData[], activity) => {
          const existingActivity = acc.find((a) => a.name === activity.name);
          if (existingActivity) {
            existingActivity.duration += activity.duration;
            existingActivity.count += 1;
          } else {
            acc.push({
              name: activity.name,
              duration: activity.duration,
              count: 1,
              avgDuration: activity.duration,
            });
          }
          return acc;
        }, [])
        .map((item) => ({
          ...item,
          avgDuration: Math.round(item.duration / item.count),
        })),
    [filteredActivities]
  );

  const dailyChartData = useMemo(() => {
    const dailyData = filteredActivities.reduce(
      (acc: { [key: string]: DailyData }, activity) => {
        const date = new Date(activity.date).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = { date, total: 0 };
        }
        acc[date][activity.name] =
          (Number(acc[date][activity.name]) || 0) + activity.duration;
        acc[date].total += activity.duration;
        return acc;
      },
      {}
    );

    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
  }, [filteredActivities]);

  return {
    activityDurationData,
    dailyChartData,
    dateRange,
    setDateRange,
    customRange,
    setCustomRange,
  };
};
