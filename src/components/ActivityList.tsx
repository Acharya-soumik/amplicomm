import React, { useState } from "react";
import { Activity } from "../types/types";

interface ActivityListProps {
  activities: Activity[];
  itemsPerPage?: number;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const paginatedActivities = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (activities.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No activities logged yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2">Activity Name</th>
            <th className="text-left px-4 py-2">Duration (mins)</th>
            <th className="text-left px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedActivities.map((activity, index) => (
            <tr
              key={activity.id}
              className="hover:bg-gray-50 animate-slideIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <td className="px-4 py-2">{activity.name}</td>
              <td className="px-4 py-2">{activity.duration}</td>
              <td className="px-4 py-2">
                {new Date(activity.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="button"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
