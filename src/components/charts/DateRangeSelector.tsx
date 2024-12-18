import React from "react";

export type DateRange = "all" | "today" | "week" | "month" | "custom";

interface DateRangeSelectorProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  customRange?: { start: string; end: string };
  onCustomRangeChange?: (start: string, end: string) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
  customRange,
  onCustomRangeChange,
}) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="flex gap-2">
      {(["all", "today", "week", "month"] as DateRange[]).map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`pill ${selectedRange === range ? "pill-active" : ""}`}
        >
          {range.charAt(0).toUpperCase() + range.slice(1)}
        </button>
      ))}
    </div>
    {selectedRange === "custom" && onCustomRangeChange && (
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={customRange?.start}
          onChange={(e) =>
            onCustomRangeChange(e.target.value, customRange?.end || "")
          }
          className="field-input"
        />
        <span>to</span>
        <input
          type="date"
          value={customRange?.end}
          onChange={(e) =>
            onCustomRangeChange(customRange?.start || "", e.target.value)
          }
          className="field-input"
        />
      </div>
    )}
  </div>
);
