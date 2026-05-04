import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API from "../api";

function ResourceDetail() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await API.get(`/resource/all`);
        const found = res.data.data.find(r => r._id === id);
        setResource(found || null);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  if (!resource) {
    return (
      <div className="container animate-fade-in" style={{ textAlign: "center", padding: "100px 0" }}>
        <h2>Article not found</h2>
        <Link to="/resources" className="btn btn-primary" style={{ marginTop: "16px" }}>Back to Resources</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "800px", paddingBottom: "60px" }}>
      <Link to="/resources" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", marginBottom: "32px", fontWeight: 600 }}>
        <FiArrowLeft /> Back to Library
      </Link>

      <div className="animate-slide-up">
        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <span className="badge badge-success">{resource.type}</span>
        </div>

        <h1 style={{ fontSize: "2.8rem", color: "var(--text-primary)", marginBottom: "32px", lineHeight: 1.2 }}>
          {resource.title}
        </h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)", paddingBottom: "24px", marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              M
            </div>
            <div>
              <strong style={{ display: "block", color: "var(--text-primary)" }}>MindEase Editorial</strong>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                {new Date(resource.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--text-secondary)" }}>
          {resource.description}
        </div>
      </div>
    </div>
  );
}

export default ResourceDetail;
