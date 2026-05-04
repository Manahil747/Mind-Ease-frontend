import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import { FaHeartbeat } from "react-icons/fa";

function NotFound() {
  return (
    <div className="auth-wrapper" style={{ flexDirection: "column", textAlign: "center" }}>
      <div className="floating-shape shape-1" style={{ background: "#e0e7ff" }}></div>
      <div className="floating-shape shape-2" style={{ background: "#fef3c7", animationDelay: "-3s" }}></div>

      <div className="animate-pop-in" style={{ marginBottom: "24px" }}>
        <div 
          className="auth-logo" 
          style={{ width: "80px", height: "80px", fontSize: "2.5rem", margin: "0 auto 32px" }}
        >
          <FaHeartbeat />
        </div>
        <h1 style={{ fontSize: "5rem", color: "var(--primary)", fontFamily: "'Outfit', sans-serif", lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "16px" }}>
          You seem somewhat lost.
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "400px", margin: "0 auto 40px" }}>
          The mental space you are looking for doesn't exist or might have been moved. Let's get you back to safety.
        </p>
        
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button 
            className="btn btn-outline" 
            onClick={() => window.history.back()}
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/dashboard" className="btn btn-primary">
            <FiHome /> Home Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
