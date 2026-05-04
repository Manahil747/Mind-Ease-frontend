import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import API from "../api";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await API.get("/resource/all");
        setResources(res.data.data || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="resources-container animate-fade-in">
      <header className="resources-header animate-slide-up">
        <h1 className="resources-title">Wellness Resources</h1>
        <p className="mood-subtitle">Explore articles, guides, and tips to support your mental journey.</p>
      </header>

      {resources.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>No resources available yet.</p>
        </div>
      ) : (
        <div className="resources-grid">
          {resources.map((resource, idx) => (
            <Link
              to={`/resources/${resource._id}`}
              key={resource._id}
              className={`glass-card resource-card glass-card-hoverable animate-pop-in animate-stagger-${idx + 1}`}
            >
              <div className="resource-image-wrapper">
                <span className="resource-category">{resource.type}</span>
              </div>

              <div className="resource-content">
                <h2 className="resource-title">{resource.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                  {resource.description.substring(0, 100)}...
                </p>
                <div className="resource-meta">
                  <span className="read-more">
                    Read More <FiArrowRight />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Resources;