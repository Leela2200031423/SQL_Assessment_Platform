import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Code2, LayoutDashboard, FileText, Clock, User, LogOut, ArrowLeft, Play, Lightbulb, XCircle, CheckCircle2 } from "lucide-react";
import API from "../api/axios";
import "../styles/dashboard.css";
import "../styles/playground.css";

export default function AssessmentPlayground() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [assessment, setAssessment] = useState(null);
    const [schemaData, setSchemaData] = useState([]);
    const [query, setQuery] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, message: string }

    useEffect(() => {
        if (!user?.role) navigate("/login");
    }, [navigate, user]);

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const res = await API.get(`/user/assessments/${id}`);
                setAssessment(res.data);
                if (res.data.expectedQuery) {
                    setQuery("SELECT * FROM "); // standard starting point
                }

                let parsedSchema = [];
                if (res.data.schemaInfo) {
                    try {
                        parsedSchema = JSON.parse(res.data.schemaInfo);
                    } catch (e) {
                        console.error("Failed to parse schema JSON", e);
                    }
                }
                setSchemaData(parsedSchema);

            } catch (err) {
                console.error("Failed to load assessment details", err);
            }
        };
        fetchAssessment();
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleExecute = async () => {
        if (!query.trim()) return;
        try {
            const res = await API.post(`/user/assessments/${id}/submit`, { query });
            setFeedback({
                isCorrect: res.data.isCorrect,
                message: res.data.message
            });
        } catch (err) {
            setFeedback({
                isCorrect: false,
                message: "An error occurred while executing the query."
            });
        }
    };

    const difficulty = assessment?.difficulty || assessment?.level || "Easy";
    let badgeClass = "badge-easy";
    if (difficulty.toLowerCase() === "medium" || difficulty.toLowerCase() === "intermediate") {
        badgeClass = "badge-medium";
    } else if (difficulty.toLowerCase() === "hard" || difficulty.toLowerCase() === "advanced") {
        badgeClass = "badge-hard";
    }

    return (
        <div className="playground-layout">
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
                    <Link to="/user/dashboard" className="nav-link">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/user/assessments" className="nav-link active">
                        <FileText size={18} />
                        <span>Assessments</span>
                    </Link>
                    <Link to="/user/attempts" className="nav-link">
                        <Clock size={18} />
                        <span>Attempts</span>
                    </Link>
                    <Link to="/user/profile" className="nav-link">
                        <User size={18} />
                        <span>Profile</span>
                    </Link>
                    <button className="nav-logout" onClick={handleLogout} title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </nav>

            {/* Main IDE area */}
            <div className="playground-container">

                <div className="playground-header-actions">
                    <button className="btn-back" onClick={() => navigate("/user/assessments")}>
                        <ArrowLeft size={16} /> Back to Assessments
                    </button>
                </div>

                {assessment ? (
                    <div className="ide-layout">

                        {/* Top row: Detail & Schema */}
                        <div className="ide-top-row">
                            {/* Question card */}
                            <div className="ide-card ide-question-card">
                                <div className="student-assessment-header">
                                    <h2 className="student-assessment-title">{assessment.title}</h2>
                                    <span className={`difficulty-badge ${badgeClass}`}>{difficulty}</span>
                                </div>
                                <p className="student-assessment-desc">{assessment.description}</p>
                            </div>

                            {/* Schema card */}
                            <div className="ide-card ide-schema-card">
                                <h3 className="ide-card-title">Schema</h3>
                                {schemaData.length > 0 ? (
                                    schemaData.map((table) => (
                                        <div key={table.tableName} className="schema-table-wrapper">
                                            <h4 className="schema-table-name">{table.tableName}</h4>
                                            <table className="schema-table">
                                                <thead>
                                                    <tr>
                                                        <th>Column</th>
                                                        <th>Type</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.columns.map((col, idx) => (
                                                        <tr key={idx}>
                                                            <td>{col.name}</td>
                                                            <td>{col.type}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))
                                ) : (
                                    <div className="schema-table-wrapper">
                                        <p className="no-schema-text">No schema tables to display.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bottom Row: Editor */}
                        <div className="ide-card ide-editor-card">
                            <h3 className="ide-card-title">SQL Editor</h3>
                            <textarea
                                className="sql-textarea"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                spellCheck="false"
                            />

                            <div className="editor-actions">
                                <button className="btn-execute" onClick={handleExecute}>
                                    <Play size={16} fill="white" /> Execute Query
                                </button>
                                <button className="btn-hint" onClick={() => setShowHint(!showHint)}>
                                    <Lightbulb size={16} /> {showHint ? "Hide Hint" : "Get Hint"}
                                </button>
                            </div>
                        </div>

                        {/* Hint & Feedback Sections outside the main card loop to appear below */}
                        {showHint && assessment.hint && (
                            <div className="hint-banner">
                                <div className="hint-header">
                                    <Lightbulb size={16} color="#059669" /> <span>Hint</span>
                                </div>
                                <p>{assessment.hint}</p>
                            </div>
                        )}

                        {feedback && (
                            <div className={`feedback-banner ${feedback.isCorrect ? 'success' : 'error'}`}>
                                {feedback.isCorrect ? (
                                    <CheckCircle2 color="#059669" size={20} />
                                ) : (
                                    <XCircle color="#ef4444" size={20} />
                                )}
                                <span>{feedback.message}</span>
                            </div>
                        )}

                        {feedback?.isCorrect && (
                            <div className="toast-notification">
                                <div className="toast-header">
                                    <strong>Well done!</strong>
                                </div>
                                <div>Your query is correct.</div>
                            </div>
                        )}

                    </div>
                ) : (
                    <p>Loading assessment...</p>
                )}
            </div>
        </div>
    );
}
