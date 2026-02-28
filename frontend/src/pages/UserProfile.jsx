import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, FileText, Clock, User, LogOut, Code2, Mail } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";

export default function UserProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // 🔐 Protect user route
    useEffect(() => {
        if (!user?.role) {
            navigate("/login");
        } else if (user.role !== "user") {
            navigate("/admin/dashboard");
        }
    }, [navigate, user]);

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

            <div className="main-content-wrapper">
                <div className="admin-home-content">
                    <h1 className="page-title">Profile</h1>

                    {/* Using existing Profile Details card styling */}
                    <div className="profile-details-card" style={{ maxWidth: '600px', padding: '32px' }}>
                        <h2 className="profile-card-title" style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px' }}>Your Details</h2>

                        <div className="profile-form-group" style={{ marginBottom: '20px' }}>
                            <label className="profile-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="text"
                                className="profile-input profile-input-readonly"
                                value={user?.email || "student@ciphersql.com"}
                                readOnly
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', color: '#9ca3af', fontSize: '14px' }}
                            />
                        </div>

                        <div className="profile-form-group">
                            <label className="profile-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4b5563', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                                <User size={16} /> Full Name
                            </label>
                            <input
                                type="text"
                                className="profile-input profile-input-readonly"
                                value={user?.name || "Student User"}
                                readOnly
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', color: '#9ca3af', fontSize: '14px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
