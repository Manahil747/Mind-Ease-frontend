import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mood from "./pages/Mood";
import MoodHistory from "./pages/MoodHistory";
import Quiz from "./pages/Quiz";
import QuizHistory from "./pages/QuizHistory";
import Chat from "./pages/Chat";
import Appointment from "./pages/Appointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public Routes (No Sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Layout Routes (With Sidebar) */}
      <Route element={<Layout />}>
        {/* Main Nav */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/resources" element={<Resources />} />

        {/* Extended History & Details */}
        <Route path="/mood/history" element={<MoodHistory />} />
        <Route path="/quiz/history" element={<QuizHistory />} />
        <Route path="/appointment/history" element={<AppointmentHistory />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        
        {/* Core auxiliary pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Wildcard 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;