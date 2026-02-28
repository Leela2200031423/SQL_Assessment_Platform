import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, FileText, Clock, User, LogOut, Code2, CheckCircle, BarChart2 } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState({
    totalAssessments: 0,
    attempted: 0,
    completed: 0,
    notAttempted: 0
  });

  // 🔐 Protect user route
  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    } else if (user.role !== "user") {
      navigate("/admin/dashboard");
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/user/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load user stats");
      }
    };
    if (user?.role === "user") {
      fetchStats();
    }
  }, [user?.role]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="dashboard-layout">
      {/* Top Demo Bar */}
      <div className="demo-topbar">
        <span>Welcome to CipherSQLStudio</span>
      </div>

      {/* Main Navbar */}
      <nav className="top-navbar">
        <div className="nav-brand">
          <div className="nav-logo">
            <Code2 size={24} color="white" />
          </div>
          <span className="brand-name">CipherSQLStudio</span>
        </div>

        <div className="nav-links">
          <Link to="/user/dashboard" className={`nav-link ${isActive("/user/dashboard") ? "active" : ""}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/user/assessments" className={`nav-link ${isActive("/user/assessments") ? "active" : ""}`}>
            <FileText size={18} />
            <span>Assessments</span>
          </Link>
          <Link to="/user/attempts" className={`nav-link ${isActive("/user/attempts") ? "active" : ""}`}>
            <Clock size={18} />
            <span>Attempts</span>
          </Link>
          <Link to="/user/profile" className={`nav-link ${isActive("/user/profile") ? "active" : ""}`}>
            <User size={18} />
            <span>Profile</span>
          </Link>
          <button className="nav-logout" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="main-content-wrapper">
        <div className="admin-home-content">
          <h1 className="page-title">Dashboard</h1>

          <div className="stats-cards-container center-3-cards">
            <div className="stat-card new-stat-card">
              <div className="stat-info">
                <span className="stat-label">Total Assessments</span>
                <span className="stat-number">{stats.totalAssessments}</span>
              </div>
              <div className="stat-icon-wrapper file-icon">
                <FileText size={24} />
              </div>
            </div>

            <div className="stat-card new-stat-card">
              <div className="stat-info">
                <span className="stat-label">Completed</span>
                <span className="stat-number">{stats.completed}</span>
              </div>
              <div className="stat-icon-wrapper check-icon">
                <CheckCircle size={24} />
              </div>
            </div>

            <div className="stat-card new-stat-card">
              <div className="stat-info">
                <span className="stat-label">Not Completed</span>
                <span className="stat-number">{stats.notAttempted}</span>
              </div>
              <div className="stat-icon-wrapper file-icon">
                <BarChart2 size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}