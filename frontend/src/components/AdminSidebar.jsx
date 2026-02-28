import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav>
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          🏠 Home
        </NavLink>
        <NavLink
          to="/admin/dashboard/manage-assessments"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          📝 Manage Assessments
        </NavLink>
        <NavLink
          to="/admin/dashboard/results"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          📊 Results
        </NavLink>
        <NavLink
          to="/admin/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          👤 Profile
        </NavLink>
      </nav>
    </aside>
  );
}