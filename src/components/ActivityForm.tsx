import React, { useState } from "react";
import { Activity } from "../types/types";
import { v4 as uuidv4 } from "uuid";

const defaultActivities = [
  "Running",
  "Walking",
  "Cycling",
  "Swimming",
  "Yoga",
  "Gym",
  "Reading",
  "Meditation",
];

const durationSuggestions = [
  { label: "15m", minutes: 15 },
  { label: "30m", minutes: 30 },
  { label: "45m", minutes: 45 },
  { label: "1h", minutes: 60 },
  { label: "1.5h", minutes: 90 },
  { label: "2h", minutes: 120 },
];

interface ActivityFormProps {
  onSubmit: (activity: Activity) => void;
  onAddSuggestion: (suggestion: string) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  onSubmit,
  onAddSuggestion,
}) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [suggestions, setSuggestions] = useState(defaultActivities);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !duration) return;

    const activity: Activity = {
      id: uuidv4(),
      name,
      duration: parseInt(duration),
      date,
    };

    onSubmit(activity);
    setName("");
    setDuration("");
  };

  const handleAddNewActivity = () => {
    if (name && !suggestions.includes(name)) {
      setSuggestions([...suggestions, name]);
      onAddSuggestion(name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="activity-name" className="form-label">
          Activity Name
        </label>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              id="activity-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="task/activity"
              required
              className="field-input"
            />
            {name && !suggestions.includes(name) && (
              <button
                type="button"
                onClick={handleAddNewActivity}
                className="button whitespace-nowrap"
              >
                Add New
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setName(suggestion)}
                className={`pill ${name === suggestion ? "pill-active" : ""}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Duration (minutes)
        </label>
        <input
          id="duration"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration in minutes"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        {/* Duration Pills */}
        <div className="mt-2 flex flex-wrap gap-2">
          {durationSuggestions?.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              onClick={() => setDuration(suggestion.minutes.toString())}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                duration === suggestion.minutes.toString()
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Log Activity
      </button>
    </form>
  );
};

export default ActivityForm;
