import React, { useState } from "react";
import data from "../DB/data.json";
import Cards from "../components/Cards";

export default function DashboardPage() {
  const [incidents, setIncidents] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [addIncidentform, setAddIncidentForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "Medium",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!newIncident.title || !newIncident.description) {
      alert("Please fill in all fields.");
      return;
    }

    // Add new incident
    const incidentToAdd = {
      ...newIncident,
      id: Date.now(),
      reported_at: new Date().toISOString(),
    };
    setIncidents((prev) => [incidentToAdd, ...prev]);

    setNewIncident({ title: "", description: "", severity: "Medium" });
    setAddIncidentForm(false);
  };

  React.useEffect(() => {
    if (data && data.incidents) {
      setIncidents(data.incidents);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center pt-10 text-gray-800">
        AI Safety Incidents
      </h1>

      <div className="flex flex-row justify-center items-center gap-4 mt-6">
        <div>
          <p className="text-lg font-medium text-gray-700">
            Filter by Severity
          </p>
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

      <div>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg mt-6 ml-2 hover:bg-blue-600 transition duration-300"
          onClick={() => setAddIncidentForm(!addIncidentform)}
        >
          {addIncidentform ? "Close Form" : "Add Incident"}
        </button>
      </div>

      {addIncidentform && (
        <form
          className="w-[90%] px-8 mx-auto mt-6 bg-white shadow-md rounded-lg p-6"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Add New Incident
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={newIncident.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter incident title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={newIncident.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter incident description"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Severity
            </label>
            <select
              name="severity"
              value={newIncident.severity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      )}

      <div className="grid auto-rows-min grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2 mt-10">
        {incidents?.map((incident) => (
          <Cards incident={incident} key={incident.id} />
        ))}
      </div>
    </div>
  );
}
