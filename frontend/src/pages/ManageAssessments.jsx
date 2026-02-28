import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";

export default function ManageAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    schemaInfo: "[]",
    expectedQuery: "",
    hint: ""
  });

  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      const res = await API.get("/admin/assessments");
      setAssessments(res.data);
    } catch (e) {
      showToast("Failed to load assessments");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const openAddModal = () => {
    setForm({
      title: "",
      description: "",
      difficulty: "Easy",
      schemaInfo: "[]",
      expectedQuery: "",
      hint: ""
    });
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (assessment) => {
    setForm({
      title: assessment.title || "",
      description: assessment.description || assessment.desc || "",
      difficulty: assessment.difficulty || assessment.level || "Easy",
      schemaInfo: assessment.schemaInfo || "[]",
      expectedQuery: assessment.expectedQuery || assessment.sqlQuery || "",
      hint: assessment.hint || ""
    });
    setEditingId(assessment._id);
    setIsModalOpen(true);
  };

  const saveOrUpdate = async () => {
    if (!form.title.trim() || !form.expectedQuery.trim()) {
      showToast("Title and Expected Query are required");
      return;
    }

    try {
      // make sure schemaInfo is valid JSON on frontend
      try {
        JSON.parse(form.schemaInfo);
      } catch (err) {
        showToast("Schema Info must be valid JSON");
        return;
      }

      const payload = {
        title: form.title,
        description: form.description,
        difficulty: form.difficulty,
        schemaInfo: form.schemaInfo,
        expectedQuery: form.expectedQuery,
        hint: form.hint,
      };

      if (editingId) {
        await API.put(`/admin/assessments/${editingId}`, payload);
        showToast("Assessment updated.");
      } else {
        await API.post(`/admin/assessments`, payload);
        showToast("Assessment created.");
      }
      setIsModalOpen(false);
      loadAssessments();
    } catch (e) {
      showToast("Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this assessment?")) {
      try {
        await API.delete(`/admin/assessments/${id}`);
        setAssessments((prev) => prev.filter((a) => a._id !== id));
        showToast("Assessment deleted.");
      } catch (e) {
        showToast("Failed to delete");
      }
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
      case 'beginner': return 'nav-link active'; // quick way to reuse green colors
      case 'medium':
      case 'intermediate': return 'badge-medium';
      case 'hard':
      case 'advanced': return 'badge-hard';
      default: return 'nav-link active';
    }
  };

  return (
    <div className="manage-assessments-page">
      <div className="manage-header">
        <h1 className="page-title">Manage Assessments</h1>
        <button className="btn-add-primary" onClick={openAddModal}>
          <Plus size={18} /> New Assessment
        </button>
      </div>

      <div className="assessments-list">
        {assessments.map((a) => (
          <div className="assessment-row" key={a._id}>
            <div className="assessment-content">
              <div className="assessment-title-row">
                <span className="assessment-title-text">{a.title}</span>
                <span className={`difficulty-badge ${getDifficultyColor(a.difficulty || a.level)}`}>
                  {a.difficulty || a.level}
                </span>
              </div>
              <p className="assessment-desc-text">{a.description || a.desc}</p>
            </div>
            <div className="assessment-actions">
              <button className="btn-icon" onClick={() => openEditModal(a)}>
                <Edit size={16} />
              </button>
              <button className="btn-icon danger" onClick={() => handleDelete(a._id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? "Edit" : "New"} Assessment</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Employee Database - Basic SQL Queries"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="You are given an Employees table. Write SQL queries based on the given requirements."
                />
              </div>

              <div className="form-group">
                <label>Difficulty</label>
                <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label>Schema Info (JSON)</label>
                <textarea
                  name="schemaInfo"
                  rows={6}
                  value={form.schemaInfo}
                  onChange={handleChange}
                  className="code-textarea"
                />
              </div>

              <div className="form-group">
                <label>Expected Query</label>
                <textarea
                  name="expectedQuery"
                  rows={4}
                  value={form.expectedQuery}
                  onChange={handleChange}
                  className="code-textarea"
                />
              </div>

              <div className="form-group">
                <label>Hint</label>
                <textarea
                  name="hint"
                  rows={2}
                  value={form.hint}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-submit-full" onClick={saveOrUpdate}>
                {editingId ? "Update Assessment" : "Create Assessment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="toast-notification">
          <div className="toast-header">
            <strong>{toastMessage.includes("created") ? "Created" : (toastMessage.includes("deleted") ? "Deleted" : "Status")}</strong>
          </div>
          <div>{toastMessage}</div>
        </div>
      )}
    </div>
  );
}