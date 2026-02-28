import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, TrendingUp, CheckCircle } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAssessments: 0,
    totalAttempts: 0,
    correctAttempts: 0,
    mostAttemptedAssessments: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        setError("Unable to load statistics");
      }
    };
    fetchStats();
  }, [navigate]);

  const { totalUsers, totalAssessments, totalAttempts, correctAttempts, mostAttemptedAssessments } = stats;

  return (
    <div className="admin-home-content">
      <h1 className="page-title">Admin Dashboard</h1>
      {error && <div className="alert-message">{error}</div>}

      <div className="stats-cards-container">
        <div className="stat-card new-stat-card">
          <div className="stat-info">
            <span className="stat-label">Assessments</span>
            <span className="stat-number">{totalAssessments}</span>
          </div>
          <div className="stat-icon-wrapper file-icon">
            <FileText size={24} />
          </div>
        </div>

        <div className="stat-card new-stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Users</span>
            <span className="stat-number">{totalUsers}</span>
          </div>
          <div className="stat-icon-wrapper users-icon">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card new-stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Attempts</span>
            <span className="stat-number">{totalAttempts}</span>
          </div>
          <div className="stat-icon-wrapper trending-icon">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="stat-card new-stat-card">
          <div className="stat-info">
            <span className="stat-label">Correct Attempts</span>
            <span className="stat-number">{correctAttempts}</span>
          </div>
          <div className="stat-icon-wrapper check-icon">
            <CheckCircle size={24} />
          </div>
        </div>
      </div>

      <div className="most-attempted-section">
        <h3 className="section-title">Most Attempted Assessments</h3>
        <div className="attempted-list">
          {mostAttemptedAssessments && mostAttemptedAssessments.length > 0 ? (
            mostAttemptedAssessments.map((assessment, index) => (
              <div className="attempted-item" key={index}>
                <span className="assessment-title">{assessment.title}</span>
                <span className="attempts-count">{assessment.totalAttempts} attempts</span>
              </div>
            ))
          ) : (
            <div className="no-data">No assessments attempted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}