import React from "react";
import data from "../DB/data.json";
import Cards from "../components/Cards";

export default function DashboardPage() {
  const [incidents, setIncidents] = React.useState([]);
  const [selectedSeverity, setSelectedSeverity] = React.useState("all");

  const handleSeverityChange = (e) => {
    const value = e.target.value;
    setSelectedSeverity(value);
    if (value === "all") {
      setIncidents(data.incidents);
    } else {
      const filteredIncidents = data.incidents.filter(
        (incident) => incident.severity === value
      );
      setIncidents(filteredIncidents);
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value === "asc") {
      const sortedIncidents = [...incidents].sort(
        (a, b) => new Date(a.reported_at) - new Date(b.reported_at)
      );
      setIncidents(sortedIncidents);
    } else {
      const sortedIncidents = [...incidents].sort(
        (a, b) => new Date(b.reported_at) - new Date(a.reported_at)
      );
      setIncidents(sortedIncidents);
    }
  };

  React.useEffect(() => {
    if (data && data.incidents) {
      setIncidents(data.incidents);
    }
  }, []);

  return (
    <div className="bg-gray-100  h-screen">
      <h1 className="text-4xl font-extrabold text-center pt-10 text-gray-800">
        AI Safety Incidents
      </h1>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
        <div>
          <p className="text-lg font-medium text-gray-700">Filter by Severity</p>
          <select
            className="border border-gray-300 rounded-lg shadow-md p-2 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedSeverity}
            onChange={(e) => handleSeverityChange(e)}
          >
            <option value="all">All</option>
            <option value="High">High Severity</option>
            <option value="Medium">Medium Severity</option>
            <option value="Low">Low Severity</option>
          </select>
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">Sort by Date</p>
          <select
            defaultValue={"asc"}
            className="border border-gray-300 rounded-lg shadow-md p-2 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => handleDateChange(e)}
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      <div className="grid auto-rows-min grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 mt-10">
        {incidents?.map((incident) => (
          <Cards incident={incident} key={incident.id} />
        ))}
      </div>
    </div>
  );
}