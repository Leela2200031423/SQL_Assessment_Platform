import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, FileText, Clock, User, LogOut, Code2 } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";
import "../styles/playground.css";

export default function UserAssessments() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        if (!user?.role) navigate("/login");
        else if (user.role !== "user") navigate("/admin/dashboard");
    }, [navigate, user]);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                const res = await API.get("/user/assessments");
                setAssessments(res.data);
            } catch (err) {
                console.error("Failed to fetch assessments", err);
            }
        };
        if (user?.role === "user") fetchAssessments();
    }, [user?.role]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="dashboard-layout">
            {/* Top Demo Bar */}
            <div className="demo-topbar">
                <span>Demo Mode — Student View</span>
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

            {/* Main Content */}
            <div className="main-content-wrapper">
                <div className="assessments-student-content">
                    <h1 className="page-title">Assessments</h1>

                    <div className="student-assessments-grid">
                        {assessments.map((a) => {
                            const difficulty = a.difficulty || a.level || "Easy";
                            let badgeClass = "badge-easy";
                            if (difficulty.toLowerCase() === "medium" || difficulty.toLowerCase() === "intermediate") {
                                badgeClass = "badge-medium";
                            } else if (difficulty.toLowerCase() === "hard" || difficulty.toLowerCase() === "advanced") {
                                badgeClass = "badge-hard";
                            }

                            return (
                                <div key={a._id} className="student-assessment-card">
                                    <div className="student-assessment-header">
                                        <h2 className="student-assessment-title">{a.title}</h2>
                                        <span className={`difficulty-badge ${badgeClass}`}>{difficulty}</span>
                                    </div>
                                    <p className="student-assessment-desc">{a.description}</p>
                                    <button
                                        className="btn-start-assignment"
                                        onClick={() => navigate(`/user/assessments/${a._id}`)}
                                    >
                                        Start Assignment →
                                    </button>
                                </div>
                            );
                        })}

                        {assessments.length === 0 && (
                            <p>No assessments available right now.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
