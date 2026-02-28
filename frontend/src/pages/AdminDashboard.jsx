import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { LayoutDashboard, Upload, BarChart2, User, LogOut, Code2 } from "lucide-react";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔐 Protect admin route
  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    } else if (user.role !== "admin") {
      navigate("/user/dashboard");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/admin/dashboard" && location.pathname === "/admin/dashboard") return true;
    if (path !== "/admin/dashboard" && location.pathname.includes(path)) return true;
    return false;
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
          <span className="role-badge">Admin</span>
        </div>

        <div className="nav-links">
          <Link to="/admin/dashboard" className={`nav-link ${isActive("/admin/dashboard") ? "active" : ""}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/dashboard/manage-assessments" className={`nav-link ${isActive("/admin/dashboard/manage-assessments") ? "active" : ""}`}>
            <Upload size={18} />
            <span>Assessments</span>
          </Link>
          <Link to="/admin/dashboard/results" className={`nav-link ${isActive("/admin/dashboard/results") ? "active" : ""}`}>
            <BarChart2 size={18} />
            <span>Results</span>
          </Link>
          <Link to="/admin/dashboard/profile" className={`nav-link ${isActive("/admin/dashboard/profile") ? "active" : ""}`}>
            <User size={18} />
            <span>Profile</span>
          </Link>
          <button className="nav-logout" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <div className="main-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
}