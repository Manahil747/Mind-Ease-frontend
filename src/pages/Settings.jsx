import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiLock, FiShield, FiTrash2 } from "react-icons/fi";
import API from "../api";
import "./Settings.css";

function Settings() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    emailNotifs: true,
    pushNotifs: false,
    darkMode: false,
    dailyReminders: true
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: ""
  });

  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePasswordChange = async () => {
    setPasswordMsg("");
    setPasswordError("");
    try {
      await API.put("/user/change-password", {
        password: passwordData.password,
        newPassword: passwordData.newPassword
      });
      setPasswordMsg("Password updated successfully!");
      setPasswordData({ password: "", newPassword: "" });
      setTimeout(() => setPasswordMsg(""), 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Password update failed!");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Are you sure? This action cannot be undone!");
    if (!confirm) return;
    setIsDeleting(true);
    try {
      await API.delete("/user/delete");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log("Error:", err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="settings-container animate-fade-in">
      <header className="profile-header animate-slide-up">
        <h1 className="profile-title">Settings</h1>
        <p className="mood-subtitle">Control your application preferences.</p>
      </header>

      {/* Preferences */}
      <section className="glass-card settings-group animate-pop-in animate-stagger-1" style={{ padding: "32px" }}>
        <h3 className="section-title"><FiBell /> Notifications & Preferences</h3>
        <div className="settings-list">
          {[
            { key: "emailNotifs", label: "Email Notifications", desc: "Receive appointment reminders." },
            { key: "pushNotifs", label: "Push Notifications", desc: "Get instant alerts on your browser." },
            { key: "dailyReminders", label: "Daily Mood Reminder", desc: "Prompt me to log my mood daily." },
            { key: "darkMode", label: "Dark Mode", desc: "Switch to a darker theme." }
          ].map(item => (
            <div key={item.key} className="setting-item">
              <div className="setting-info">
                <h4>{item.label}</h4>
                <p>{item.desc}</p>
              </div>
              <label className="ui-toggle">
                <input type="checkbox" checked={preferences[item.key]} onChange={() => handleToggle(item.key)} />
                <span className="ui-toggle-slider"></span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Change Password */}
      <section className="glass-card settings-group animate-pop-in animate-stagger-2" style={{ padding: "32px" }}>
        <h3 className="section-title"><FiLock /> Security & Password</h3>

        {passwordMsg && <p style={{ color: 'green', marginBottom: '12px' }}>{passwordMsg}</p>}
        {passwordError && <p style={{ color: 'red', marginBottom: '12px' }}>{passwordError}</p>}

        <div className="form-group" style={{ maxWidth: "400px" }}>
          <label className="form-label">Current Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="form-input"
            value={passwordData.password}
            onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
          />
        </div>
        <div className="form-group" style={{ maxWidth: "400px" }}>
          <label className="form-label">New Password</label>
          <input
            type="password"
            placeholder="Create a new secure password"
            className="form-input"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: "8px" }}
          onClick={handlePasswordChange}
          disabled={!passwordData.password || !passwordData.newPassword}
        >
          Update Password
        </button>
      </section>

      {/* Danger Zone */}
      <section className="glass-card settings-group danger-zone animate-pop-in animate-stagger-3" style={{ padding: "32px" }}>
        <h3 className="section-title" style={{ borderColor: "#fecaca" }}><FiShield /> Privacy & Data</h3>
        <div className="settings-list">
          <div className="setting-item" style={{ borderBottom: "none" }}>
            <div className="setting-info">
              <h4 style={{ color: "#b91c1c" }}>Delete Account</h4>
              <p>Permanently remove your account. This cannot be undone.</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
            >
              <FiTrash2 /> {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Settings;