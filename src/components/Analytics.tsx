import React, { useState } from "react";
import { Activity, ChartType } from "../types/types";
import { CHART_TITLES } from "../constants/chart";
import { useChartData } from "../hooks/useChartData";
import { ChartContainer } from "./charts/ChartContainer";
import { PieChartView } from "./charts/PieChartView";
import { BarChartView } from "./charts/BarChartView";
import { DailyChartView } from "./charts/DailyChartView";
import { RadarChartView } from "./charts/RadarChartView";
import { DateRangeSelector } from "./charts/DateRangeSelector";

interface AnalyticsProps {
  activities: Activity[];
}

const Analytics: React.FC<AnalyticsProps> = ({ activities }) => {
  const [activeChart, setActiveChart] = useState<ChartType>("pie");
  const {
    activityDurationData,
    dailyChartData,
    dateRange,
    setDateRange,
    customRange,
    setCustomRange,
  } = useChartData(activities);

  if (activities.length === 0) {
    return (
      <div className="card text-center text-gray-500 py-8">
        Add some activities to see analytics
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-center gap-2 mb-6">
        {(Object.keys(CHART_TITLES) as ChartType[]).map((type) => (
          <button
            key={type}
            onClick={() => setActiveChart(type)}
            className={`pill ${activeChart === type ? "pill-active" : ""}`}
          >
            {type === "daily"
              ? "Daily Stack"
              : `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`}
          </button>
        ))}
      </div>

      <DateRangeSelector
        selectedRange={dateRange}
        onRangeChange={setDateRange}
        customRange={customRange}
        onCustomRangeChange={(start, end) => setCustomRange({ start, end })}
      />

      <ChartContainer
        title={`${CHART_TITLES[activeChart]} ${
          dateRange !== "all"
            ? `(${dateRange.charAt(0).toUpperCase() + dateRange.slice(1)})`
            : ""
        }`}
      >
        {activeChart === "pie" && <PieChartView data={activityDurationData} />}
        {activeChart === "bar" && <BarChartView data={activityDurationData} />}
        {activeChart === "radar" && (
          <RadarChartView data={activityDurationData} />
        )}
        {activeChart === "daily" && <DailyChartView data={dailyChartData} />}
      </ChartContainer>
    </div>
  );
};

export default Analytics;
