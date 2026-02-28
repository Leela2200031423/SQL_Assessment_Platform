import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/AdminHome";
import ManageAssessments from "./pages/ManageAssessments";
import Results from "./pages/Results";
import AdminProfile from "./pages/AdminProfile";
import UserDashboard from "./pages/UserDashboard";
import UserAssessments from "./pages/UserAssessments";
import AssessmentPlayground from "./pages/AssessmentPlayground";
import UserAttempts from "./pages/UserAttempts";
import LandingPage from './pages/LandingPage';
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* admin section with nested routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="manage-assessments" element={<ManageAssessments />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/assessments" element={<UserAssessments />} />
        <Route path="/user/assessments/:id" element={<AssessmentPlayground />} />
        <Route path="/user/attempts" element={<UserAttempts />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;