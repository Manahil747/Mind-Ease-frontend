import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome, FiSmile, FiEdit3, FiMessageSquare,
  FiCalendar, FiBookOpen, FiSettings, FiMenu, FiX
} from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import API from "../api";
import "./Layout.css";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/profile");
        setUserName(res.data.data.name);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchUser();
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "Mood Tracker", path: "/mood", icon: <FiSmile /> },
    { name: "Take Quiz", path: "/quiz", icon: <FiEdit3 /> },
    { name: "AI Chat", path: "/chat", icon: <FiMessageSquare /> },
    { name: "Appointments", path: "/appointment", icon: <FiCalendar /> },
    { name: "Resources", path: "/resources", icon: <FiBookOpen /> },
    { name: "Settings", path: "/settings", icon: <FiSettings /> },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout-container">
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="logo-container" style={{ marginBottom: 0, cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <div className="logo-icon"><FaHeartbeat /></div>
          <h2 className="logo-text">MindEase</h2>
        </div>
        <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="logo-container" style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <div className="logo-icon"><FaHeartbeat /></div>
          <h2 className="logo-text">MindEase</h2>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item animate-fade-in animate-stagger-${Math.min(index, 5)} ${isActive ? "active" : ""}`}
                onClick={closeSidebar}
              >
                <div className="nav-icon">{item.icon}</div>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div
          className="user-profile-widget animate-slide-up"
          onClick={() => { navigate("/profile"); closeSidebar(); }}
          title="Go to Profile"
        >
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            background: 'var(--primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
            flexShrink: 0
          }}>
            {userName?.charAt(0)?.toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{userName || "User"}</span>
            <span className="user-role">View Profile</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>

      {isSidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}

export default Layout;