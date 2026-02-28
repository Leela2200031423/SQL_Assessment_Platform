import React from "react";
import { Shield, Mail, User } from "lucide-react";
import "../styles/dashboard.css";

export default function AdminProfile() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="admin-profile-page">
      <h1 className="page-title">Admin Profile</h1>

      <div className="profile-details-card">
        <h2 className="profile-card-title">Your Details</h2>

        <div className="profile-form-group">
          <label className="profile-label">
            <Shield size={16} /> Role
          </label>
          <input
            type="text"
            className="profile-input profile-input-readonly"
            value={user?.role === 'admin' ? 'Admin' : (user?.role || 'Admin')}
            readOnly
          />
        </div>

        <div className="profile-form-group">
          <label className="profile-label">
            <Mail size={16} /> Email
          </label>
          <input
            type="text"
            className="profile-input profile-input-readonly"
            value={user?.email || "admin@ciphersql.com"}
            readOnly
          />
        </div>

        <div className="profile-form-group">
          <label className="profile-label">
            <User size={16} /> Full Name
          </label>
          <input
            type="text"
            className="profile-input profile-input-readonly"
            value={user?.name || "Dr. Sarah Mitchell"}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}