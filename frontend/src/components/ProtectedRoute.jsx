import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element, requiredRole = null }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // No user in localStorage - redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check role if required
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  // All checks passed
  return element;
}
