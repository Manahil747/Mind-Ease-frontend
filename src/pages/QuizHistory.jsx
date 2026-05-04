import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiEdit3, FiChevronRight } from "react-icons/fi";
import API from "../api";

function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/quiz/history");
        setQuizHistory(res.data.data || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "800px" }}>
      <header className="profile-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="profile-title">Assessment History</h1>
          <p className="mood-subtitle">Review your past self-assessments.</p>
        </div>
        <Link to="/quiz" className="btn btn-outline"><FiArrowLeft /> Back to Quiz</Link>
      </header>

      {quizHistory.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No quiz history yet — take your first assessment!</p>
          <Link to="/quiz" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>Take Quiz</Link>
        </div>
      ) : (
        <div className="animate-slide-up animate-stagger-1" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {[...quizHistory].reverse().map((quiz) => {
            let color = "var(--primary)";
            if (quiz.interpretation === "Moderate") color = "#f59e0b";
            if (quiz.interpretation === "High") color = "#ef4444";

            return (
              <div key={quiz._id} className="glass-card glass-card-hoverable" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-light)", paddingBottom: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.4rem", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <FiEdit3 style={{ color: "var(--text-light)" }} />
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </h3>
                    <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      Total Score: {quiz.score}
                    </span>
                  </div>
                  <div
                    className="badge"
                    style={{ background: `${color}20`, color: color, fontSize: "1.1rem", padding: "8px 24px" }}
                  >
                    {quiz.interpretation}
                  </div>
                </div>

                <div style={{ alignSelf: "flex-end", marginTop: "8px" }}>
                  <Link to="/resources" className="read-more" style={{ color: "var(--primary)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    View Related Resources <FiChevronRight />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuizHistory;