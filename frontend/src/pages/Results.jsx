import React, { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/dashboard.css";

export default function Results() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/admin/results");
        setData(res.data);
      } catch (e) {
        setError("Unable to fetch results");
      }
    };
    load();
  }, []);

  return (
    <div className="admin-home-content">
      <h1 className="page-title">User Results</h1>
      {error && <div className="alert-message">{error}</div>}

      <div className="results-table-container">
        <table className="custom-results-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th className="text-center">Attempts</th>
              <th className="text-center">Correct</th>
              <th className="text-center">Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => (
              <tr key={i}>
                <td className="font-medium text-gray-900">{r.name || "Unknown User"}</td>
                <td className="text-gray-500">{r.email || r.userId}</td>
                <td className="text-center font-medium text-gray-700">{r.attemptsCount}</td>
                <td className="text-center font-medium text-green-600">{r.solvedCount}</td>
                <td className="text-center text-gray-600">{Math.round(r.rate || 0)}%</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">No results available yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}