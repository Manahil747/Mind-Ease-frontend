import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import API from "../api";

function AppointmentHistory() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await API.get("/appointment/all");
        setAppointments(res.data.data || []);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const upcoming = appointments.filter(a => a.status === "booked");
  const past = appointments.filter(a => a.status !== "booked");

  const handleCancel = async (id) => {
    try {
      await API.put(`/appointment/cancel/${id}`);
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'cancelled' } : a));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const renderCard = (appt, isUpcoming) => (
    <div key={appt._id} className="glass-card" style={{ padding: "24px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "16px" }}>
     {appt.therapistId?.photo ? (
    <img
        src={`http://localhost:3000${appt.therapistId.photo}`}
        alt={appt.therapistId.name}
        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
    />
) : (
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', flexShrink: 0 }}>
        {appt.therapistId?.name?.charAt(0) || "T"}
    </div>
)}
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
            {appt.therapistId?.name || "Therapist"}
          </h3>
          <span className={`badge ${isUpcoming ? 'badge-success' : 'badge-info'}`}>
            {appt.status}
          </span>
        </div>
        <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "16px" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiCalendar /> {new Date(appt.date).toLocaleDateString()}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <FiClock /> {appt.time}
          </span>
        </div>
        {isUpcoming && (
          <button
            className="btn btn-outline"
            style={{ padding: "8px 16px", fontSize: "0.9rem", color: 'red', borderColor: 'red' }}
            onClick={() => handleCancel(appt._id)}
          >
            Cancel Appointment
          </button>
        )}
      </div>
    </div>
  );

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: "900px" }}>
      <header className="profile-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="profile-title">Your Appointments</h1>
          <p className="mood-subtitle">Manage upcoming sessions and review past visits.</p>
        </div>
        <Link to="/appointment" className="btn btn-outline"><FiArrowLeft /> Book New</Link>
      </header>

      <section className="animate-slide-up animate-stagger-1" style={{ marginBottom: "48px" }}>
        <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Upcoming</h2>
        {upcoming.length > 0
          ? upcoming.map(appt => renderCard(appt, true))
          : <p style={{ color: "var(--text-secondary)" }}>No upcoming appointments.</p>
        }
      </section>

      <section className="animate-slide-up animate-stagger-2">
        <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "24px" }}>Past Visits</h2>
        {past.length > 0
          ? past.map(appt => renderCard(appt, false))
          : <p style={{ color: "var(--text-secondary)" }}>No past appointments.</p>
        }
      </section>
    </div>
  );
}

export default AppointmentHistory;