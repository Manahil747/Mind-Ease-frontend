import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiCheckCircle } from "react-icons/fi";
import API from "../api";
import "./Appointment.css";

const MOCK_TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM"];

function Appointment() {
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await API.get("/therapist/all");
        setTherapists(res.data.data || []);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchTherapists();
  }, []);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedTherapist) return;
    setIsLoading(true);
    setError("");
    try {
      await API.post("/appointment/book", {
        therapistId: selectedTherapist._id,
        date: selectedDate,
        time: selectedTime
      });
      setIsBooked(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSelection = () => {
    setSelectedTherapist(null);
    setSelectedDate("");
    setSelectedTime("");
    setIsBooked(false);
  };

  if (isBooked) {
    return (
      <div className="appointment-container animate-slide-up">
        <div className="glass-card confirmation-popup">
          <FiCheckCircle className="success-icon" />
          <h2 className="appointment-title">Booking Confirmed!</h2>
          <p className="mood-subtitle" style={{ marginBottom: 32 }}>
            Your appointment with {selectedTherapist?.name} is scheduled for {selectedDate} at {selectedTime}.
            A confirmation email has been sent!
          </p>
          <button className="btn btn-primary" onClick={cancelSelection}>
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-container animate-fade-in">
      <header className="appointment-header animate-slide-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="appointment-title">Book a Therapist</h1>
          <p className="mood-subtitle">Find the right professional support for your mental health journey.</p>
        </div>
        <Link to="/appointment/history" className="btn btn-outline" style={{ background: "var(--glass-bg)" }}>
          <FiClock /> View History
        </Link>
      </header>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {therapists.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>No therapists available yet.</p>
        </div>
      ) : (
        <section className="therapist-grid">
          {therapists.map((therapist, idx) => (
            <div
              key={therapist._id}
              className={`glass-card therapist-card glass-card-hoverable animate-pop-in animate-stagger-${idx + 1}`}
              data-selected={selectedTherapist?._id === therapist._id}
            >
             {therapist.photo ? (
    <img 
        src={`http://localhost:3000${therapist.photo}`}
        alt={therapist.name}
        style={{ 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%', 
        objectFit: 'cover',
        objectPosition: 'top',
        flexShrink: 0 
    }}
    />
) : (
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', flexShrink: 0 }}>
        {therapist.name.charAt(0)}
    </div>
)}
              <h3 className="therapist-name">{therapist.name}</h3>
              <span className="therapist-specialty">{therapist.specialization?.join(", ")}</span>

              <div className="therapist-meta">
                <span className="meta-item"><FiCalendar /> {therapist.availability?.[0]}</span>
              </div>

              <button
                className={`btn w-full ${selectedTherapist?._id === therapist._id ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedTherapist(therapist)}
              >
                {selectedTherapist?._id === therapist._id ? "Selected" : "Select Therapist"}
              </button>
            </div>
          ))}
        </section>
      )}

      {selectedTherapist && (
        <section className="glass-card booking-section animate-slide-up" id="booking-form">
          <h2 className="booking-title">Schedule with {selectedTherapist.name}</h2>

          <div className="booking-grid">
            <div className="form-group">
              <label className="form-label">Select Date</label>
              <input
                type="date"
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Available Time Slots</label>
              <div className="time-slots">
                {MOCK_TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    className={`time-btn ${selectedTime === time ? "selected" : ""}`}
                    disabled={!selectedDate}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-actions pt-4" style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
            <button className="btn btn-outline" onClick={cancelSelection} disabled={isLoading}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime || isLoading}
            >
              {isLoading ? "Confirming..." : "Confirm Appointment"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Appointment;