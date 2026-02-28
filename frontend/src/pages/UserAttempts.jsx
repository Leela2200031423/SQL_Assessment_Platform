import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, FileText, Clock, User, LogOut, Code2, CheckCircle2, XCircle } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";
import "../styles/playground.css";

export default function UserAttempts() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        if (!user?.role) navigate("/login");
        else if (user.role !== "user") navigate("/admin/dashboard");
    }, [navigate, user]);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await API.get("/user/attempts");
                setAttempts(res.data);
            } catch (err) {
                console.error("Failed to fetch attempts", err);
            }
        };
        if (user?.role === "user") fetchAttempts();
    }, [user?.role]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path;

    // Formatter for `3/5/2026, 2:30:00 PM`
    const formatDate = (isoString) => {
        const d = new Date(isoString);
        return d.toLocaleString("en-US", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

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
                    <h1 className="page-title">My Attempts</h1>

                    <div className="attempts-list-container">
                        {attempts.map((attempt) => {
                            // Safely handle missing assessment populates
                            const assessData = attempt.assessment || {};
                            const difficulty = assessData.difficulty || assessData.level || "Easy";

                            let badgeClass = "badge-easy";
                            if (difficulty.toLowerCase() === "medium" || difficulty.toLowerCase() === "intermediate") {
                                badgeClass = "badge-medium";
                            } else if (difficulty.toLowerCase() === "hard" || difficulty.toLowerCase() === "advanced") {
                                badgeClass = "badge-hard";
                            }

                            return (
                                <div key={attempt._id} className="attempt-row-card">
                                    <div className="attempt-left">
                                        <div className="attempt-title-row">
                                            <h3 className="attempt-title">{assessData.title || "Deleted Assessment"}</h3>
                                            <span className={`difficulty-badge ${badgeClass}`}>{difficulty}</span>
                                        </div>
                                        <span className="attempt-date">{formatDate(attempt.createdAt)}</span>
                                    </div>

                                    <div className="attempt-right">
                                        {attempt.isCorrect ? (
                                            <div className="attempt-status status-correct">
                                                <CheckCircle2 size={18} />
                                                <span>Correct</span>
                                            </div>
                                        ) : (
                                            <div className="attempt-status status-incorrect">
                                                <XCircle size={18} />
                                                <span>Incorrect</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {attempts.length === 0 && (
                            <p>You haven't attempted any assessments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
