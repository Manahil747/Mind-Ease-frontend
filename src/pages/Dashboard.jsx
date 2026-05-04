import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiActivity, FiSmile, FiMessageSquare, FiCalendar, FiChevronRight } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import API from "../api";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, profileRes] = await Promise.all([
          API.get("/dashboard"),
          API.get("/user/profile")
        ]);
        setDashboardData(dashRes.data.data);
        setUserName(profileRes.data.data.name);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const moodHistory = dashboardData?.moodData || [];
  const appointments = dashboardData?.appointment || [];

  const chartData = {
    labels: moodHistory.map((log) => new Date(log.date).toLocaleDateString()),
    datasets: [
      {
        fill: true,
        label: "Mood Level",
        data: moodHistory.map((log) => log.intensity),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#10b981",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { family: "DM Sans" },
        bodyFont: { family: "DM Sans" },
      },
    },
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 2 } },
      x: { grid: { display: false } },
    },
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Loading...</div>;

  return (
    <div className="animate-fade-in">
      <header className="dashboard-header animate-slide-up">
        <h1 className="welcome-title">Welcome Back, {userName} 👋</h1>
        <p className="welcome-subtitle">Here's your mental health overview for this week.</p>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <div className="glass-card stat-card glass-card-hoverable animate-pop-in animate-stagger-1">
          <div className="stat-card-header">
            <span className="stat-label">Mood Logs</span>
            <div className="stat-icon icon-blue"><FiSmile /></div>
          </div>
          <div className="stat-value">{moodHistory.length}</div>
          <div className="badge badge-info">This Week</div>
        </div>

        <div className="glass-card stat-card glass-card-hoverable animate-pop-in animate-stagger-2">
          <div className="stat-card-header">
            <span className="stat-label">Avg Wellness</span>
            <div className="stat-icon icon-green"><FaHeartbeat /></div>
          </div>
          <div className="stat-value">
            {moodHistory.length > 0
              ? Math.round(moodHistory.reduce((sum, m) => sum + m.intensity, 0) / moodHistory.length * 10)
              : 0}%
          </div>
          <div className="badge badge-success">This Week</div>
        </div>

        <div className="glass-card stat-card glass-card-hoverable animate-pop-in animate-stagger-3">
          <div className="stat-card-header">
            <span className="stat-label">Appointments</span>
            <div className="stat-icon icon-orange"><FiCalendar /></div>
          </div>
          <div className="stat-value">{appointments.length}</div>
          <div className="badge badge-warning">Upcoming</div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="dashboard-grid">
        <div className="glass-card chart-section animate-slide-up animate-stagger-2">
          <div className="section-header">
            <h2 className="section-title">Weekly Mood Trend</h2>
            <Link to="/mood" className="btn btn-outline" style={{ padding: "6px 16px", fontSize: "0.85rem" }}>
              View History <FiChevronRight />
            </Link>
          </div>
          <div className="chart-container">
            {moodHistory.length > 0
              ? <Line options={chartOptions} data={chartData} />
              : <p style={{textAlign:'center', color:'var(--text-secondary)'}}>No mood data yet — log your first mood!</p>
            }
          </div>
        </div>

        <div className="glass-card actions-section animate-slide-up animate-stagger-3">
          <h2 className="section-title">Quick Actions</h2>

          <Link to="/mood">
            <button className="quick-action-btn">
              <div className="quick-action-icon"><FiSmile /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>Log Mood</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 400 }}>Record how you feel today</div>
              </div>
              <FiChevronRight style={{ color: "var(--text-light)" }} />
            </button>
          </Link>

          <Link to="/quiz">
            <button className="quick-action-btn">
              <div className="quick-action-icon" style={{ background: "#fef3c7", color: "#d97706" }}><FiActivity /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>Take Quiz</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 400 }}>Check your anxiety levels</div>
              </div>
              <FiChevronRight style={{ color: "var(--text-light)" }} />
            </button>
          </Link>

          <Link to="/chat">
            <button className="quick-action-btn">
              <div className="quick-action-icon" style={{ background: "#e0e7ff", color: "#4f46e5" }}><FiMessageSquare /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>AI Support Chat</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 400 }}>Talk about your day</div>
              </div>
              <FiChevronRight style={{ color: "var(--text-light)" }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;