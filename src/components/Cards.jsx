import React from "react";

export default function Cards({ incident }) {
  const [expanded, setExpanded] = React.useState(false);
  const getSeverityBadgeColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div
      key={incident.id}
      className="border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:shadow-lg hover:border-blue-400 transition-all duration-300"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-500 transition-colors duration-300">
        {incident.title}
      </h2>
      <p className="text-sm mb-2">
        <span className="font-bold">Severity:</span>{" "}
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getSeverityBadgeColor(
            incident.severity
          )}`}
        >
          
          {incident.severity}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-bold">Reported Date:</span>{" "}
        {new Date(incident.reported_at).toLocaleDateString()}
      </p>
      {!expanded && (
        <p
          className="text-sm text-blue-500 cursor-pointer mt-2 hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          View details
        </p>
      )}
      {expanded && (
        <>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-bold">Description:</span>{" "}
            {incident.description}
          </p>
          <p
            className="text-sm text-blue-500 cursor-pointer mt-2 hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            Hide details
          </p>
        </>
      )}
    </div>
  );
}