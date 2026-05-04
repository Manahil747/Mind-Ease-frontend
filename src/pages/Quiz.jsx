import { useState } from "react";
import { FiCheck, FiActivity, FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import API from "../api";
import "./Quiz.css";

const QUESTIONS = [
  {
    id: 1,
    question: "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 2,
    question: "How often have you had trouble relaxing?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 3,
    question: "How often have you been bothered by poor appetite or overeating?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 4,
    question: "How often do you feel nervous, anxious or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  }
];

const MAX_SCORE = QUESTIONS.length * 3; // 12

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState("animate-fade-in");
  const [resultData, setResultData] = useState(null);

  const handleOptionClick = (optionIndex, scoreValue) => {
    setSelectedOption(optionIndex);
    setTimeout(() => {
      handleNext(scoreValue);
    }, 600);
  };

  const handleNext = async (scoreValue) => {
    const newScore = score + scoreValue;
    setScore(newScore);

    if (currentQuestion + 1 < QUESTIONS.length) {
      setFade("");
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setFade("animate-pop-in");
      }, 50);
    } else {
      // Quiz complete — calculate interpretation
      const percentage = (newScore / MAX_SCORE) * 100;
      let interpretation = "Low";
      if (percentage > 40 && percentage <= 70) interpretation = "Moderate";
      else if (percentage > 70) interpretation = "High";

      // Save to backend
      try {
        await API.post("/quiz/saveResult", {
          score: newScore,
          interpretation
        });
      } catch (err) {
        console.log("Result save error:", err);
      }

      setResultData({ score: newScore, interpretation });
      setShowResult(true);
    }
  };

  const renderResult = () => {
    if (!resultData) return null;

    let result = { level: "", desc: "", color: "" };

    if (resultData.interpretation === "Low") {
      result = {
        level: "Minimal Anxiety",
        desc: "You seem to be managing well. Continue practicing good self-care and mental hygiene.",
        color: "var(--primary)"
      };
    } else if (resultData.interpretation === "Moderate") {
      result = {
        level: "Mild Anxiety",
        desc: "You're experiencing some symptoms. It might be helpful to track your mood and talk to our AI.",
        color: "#f59e0b"
      };
    } else {
      result = {
        level: "Moderate to High Anxiety",
        desc: "It looks like things are tough right now. We highly recommend booking a session with a therapist.",
        color: "#ef4444"
      };
    }

    return (
      <div className="glass-card result-card">
        <div className="result-icon" style={{ color: result.color, background: `${result.color}20` }}>
          <FiActivity />
        </div>
        <h2 className="result-title">Quiz Complete</h2>
        <div className="result-level" style={{ color: result.color, border: `1px solid ${result.color}50` }}>
          {result.level}
        </div>
        <p className="result-desc">{result.desc}</p>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Score: {resultData.score}/{MAX_SCORE}
        </p>
        <div className="result-actions">
          <Link to="/chat" className="btn btn-primary btn-large">
            <FiMessageCircle /> Chat with AI
          </Link>
          <Link to="/appointment" className="btn btn-outline btn-large">
            Book Therapist
          </Link>
        </div>
      </div>
    );
  };

  const progressPercentage = (currentQuestion / QUESTIONS.length) * 100;

  return (
    <div className="quiz-container animate-fade-in">
      <header className="quiz-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <div>
          <h1 className="quiz-title">Self-Assessment</h1>
          <p className="mood-subtitle">Take a moment to evaluate your current mental state.</p>
        </div>
        <Link to="/quiz/history" className="btn btn-outline" style={{ background: "var(--glass-bg)" }}>
          View Past Results
        </Link>
      </header>

      {!showResult ? (
        <>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>

          <div className={`glass-card quiz-card ${fade}`}>
            <span className="question-counter">
              Question {currentQuestion + 1} of {QUESTIONS.length}
            </span>
            <h2 className="question-text">{QUESTIONS[currentQuestion].question}</h2>

            <div className="options-grid">
              {QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${selectedOption === idx ? "selected" : ""}`}
                  onClick={() => handleOptionClick(idx, option.score)}
                  disabled={selectedOption !== null}
                >
                  {option.text}
                  <div className="option-icon">
                    <FiCheck />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        renderResult()
      )}
    </div>
  );
}

export default Quiz;