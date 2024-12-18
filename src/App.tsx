import { useState } from "react";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import { Activity } from "./types/types";
import Analytics from "./components/Analytics";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitySuggestions, setActivitySuggestions] = useState<string[]>([]);

  const handleAddActivity = (activity: Activity) => {
    setActivities([...activities, activity]);
  };

  const handleAddSuggestion = (suggestion: string) => {
    setActivitySuggestions([...activitySuggestions, suggestion]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-red-500 text-center mb-8">
        Activity Tracker
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Form Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Log New Activity
          </h2>
          <ActivityForm
            onSubmit={handleAddActivity}
            onAddSuggestion={handleAddSuggestion}
          />
        </div>

        {/* Activity List Section */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Activity History
          </h2>
          <ActivityList activities={activities} itemsPerPage={5} />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Activity Analytics
        </h2>
        <Analytics activities={activities} />
      </div>
    </div>
  );
}

export default App;
