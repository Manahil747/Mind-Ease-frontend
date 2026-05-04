import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import API from "../api";
import "./Mood.css";

const MOODS = [
  { label: "Awful", emoji: "😣", intensity: 2, color: "#ef4444", moodType: "sad" },
  { label: "Sad", emoji: "😥", intensity: 4, color: "#8b5cf6", moodType: "sad" },
  { label: "Okay", emoji: "😐", intensity: 6, color: "#f59e0b", moodType: "neutral" },
  { label: "Good", emoji: "🙂", intensity: 8, color: "#3b82f6", moodType: "happy" },
  { label: "Great", emoji: "🤩", intensity: 10, color: "#10b981", moodType: "happy" },
];

function Mood() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentHistory, setRecentHistory] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/mood/history");
      setRecentHistory(res.data.data || []);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleSave = async () => {
    if (!selectedMood) return;
    setIsSubmitting(true);
    try {
      await API.post("/mood/add", {
        moodType: selectedMood.moodType,
        intensity: selectedMood.intensity,
        note
      });
      setSuccess("Mood saved successfully!");
      setSelectedMood(null);
      setNote("");
      fetchHistory();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mood-container animate-fade-in">
      <header className="mood-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="mood-title">How are you feeling?</h1>
          <p className="mood-subtitle">Track your emotions to understand your mental well-being.</p>
        </div>
        <Link to="/mood/history" className="btn btn-outline" style={{ background: "var(--glass-bg)" }}>
          View History
        </Link>
      </header>

      {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{success}</p>}

      {/* Mood Selector */}
      <div className="glass-card mood-selector-card animate-pop-in animate-stagger-1">
        <div className="emoji-container">
          {MOODS.map((mood) => {
            let state = "default";
            if (selectedMood?.label === mood.label) state = "active";
            else if (selectedMood) state = "muted";
            return (
              <button
                key={mood.label}
                className="mood-emoji-btn"
                data-state={state}
                onClick={() => setSelectedMood(mood)}
              >
                <span className="emoji">{mood.emoji}</span>
                <span className="emoji-label">{mood.label}</span>
              </button>
            );
          })}
        </div>

        {selectedMood && (
          <div className="mood-note animate-slide-up">
            <div className="form-group">
              <input
                type="text"
                placeholder="Add a quick note (optional)"
                className="form-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-full mt-2"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : <><FiCheck /> Save Mood Log</>}
            </button>
          </div>
        )}
      </div>

      {/* Recent History */}
      <div className="glass-card history-section animate-slide-up animate-stagger-2">
        <h2 className="history-title">Recent History</h2>
        <div className="timeline">
          {recentHistory.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No mood logs yet!</p>
          )}
          {[...recentHistory].reverse().slice(0, 5).map((log, index) => {
            const moodData = MOODS.find(m => m.moodType === log.moodType) || MOODS[2];
            return (
              <div key={index} className={`timeline-item animate-fade-in animate-stagger-${Math.min(index + 3, 5)}`}>
                <div className="timeline-dot">{moodData.emoji}</div>
                <div className="timeline-content">
                  <div className="timeline-date">{new Date(log.date).toLocaleDateString()}</div>
                  <div className="timeline-mood">{log.moodType}</div>
                  {log.note && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{log.note}</div>}
                </div>
                <div className="badge badge-info" style={{ opacity: 0.7 }}>
                  Lvl {log.intensity}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Mood;