import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiActivity } from "react-icons/fi";
import API from "../api";
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
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const MOOD_EMOJIS = {
  happy: "😊",
  sad: "😢",
  anxious: "😰",
  angry: "😠",
  neutral: "😐"
};

function MoodHistory() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/mood/history");
        setMoodHistory(res.data.data || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const chartData = {
    labels: moodHistory.map(data => new Date(data.date).toLocaleDateString()),
    datasets: [{
      label: 'Mood Intensity',
      data: moodHistory.map(data => data.intensity),
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgba(16, 185, 129, 1)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        callbacks: {
          label: (context) => ` Intensity: ${context.parsed.y} / 10`
        }
      }
    },
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 2, color: '#94a3b8' } },
      x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "1000px" }}>
      <header className="profile-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="profile-title">Mood History</h1>
          <p className="mood-subtitle">Your comprehensive emotional check-in.</p>
        </div>
        <Link to="/mood" className="btn btn-outline"><FiArrowLeft /> Back to Tracker</Link>
      </header>

      {/* Chart */}
      <div className="glass-card animate-pop-in" style={{ height: "400px", padding: "24px", marginBottom: "40px" }}>
        <h3 className="section-title" style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "none", marginBottom: "16px" }}>
          <FiActivity /> Mood Trend
        </h3>
        <div style={{ height: "300px" }}>
          {moodHistory.length > 0
            ? <Line data={chartData} options={chartOptions} />
            : <p style={{ textAlign: 'center', color: 'var(--text-secondary)', paddingTop: '100px' }}>No mood data yet!</p>
          }
        </div>
      </div>

      {/* Detailed Logs */}
      <div className="glass-card animate-slide-up animate-stagger-2" style={{ padding: "32px" }}>
        <h3 className="section-title" style={{ marginBottom: "24px" }}>Detailed Logs</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {moodHistory.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No logs yet — start tracking your mood!</p>
          )}
          {[...moodHistory].reverse().map((entry, idx) => (
            <div key={idx} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "16px", borderRadius: "12px", background: "var(--bg-primary)",
              border: "1px solid var(--border)"
            }}>
              <div>
                <strong style={{ fontSize: "1.1rem", display: "block", color: "var(--text-primary)" }}>
                  {MOOD_EMOJIS[entry.moodType] || "😐"} {entry.moodType}
                </strong>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                  {new Date(entry.date).toLocaleDateString()} {new Date(entry.createdAt).toLocaleTimeString()}
                </span>
                {entry.note && <span style={{ display: 'block', color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: '4px' }}>{entry.note}</span>}
              </div>
              <div className="badge badge-success" style={{ fontSize: "1rem", padding: "8px 16px" }}>
                {entry.intensity}/10
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoodHistory;