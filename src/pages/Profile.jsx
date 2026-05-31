import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiEdit3, FiSave, FiActivity, FiSmile, FiBookOpen, FiLogOut } from "react-icons/fi";
import API from "../api";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    photo: ""
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile");
        const user = res.data.data;
        setProfileData({
          name: user.name || "",
          email: user.email || "",
          age: user.age || "",
          gender: user.gender || "",
          photo: user.photo || ""
        });
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await API.put("/user/profile", {
        name: profileData.name,
        age: profileData.age,
        gender: profileData.gender
      });
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    const formData = new FormData();
    formData.append('photo', file);
    
    try {
      const res = await API.post('/user/upload-photo', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      setProfileData(prev => ({...prev, photo: res.data.data.photo}));
      setSuccess("Photo updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch(err) {
      console.log("Error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="profile-container animate-fade-in">
      <header className="profile-header animate-slide-up">
        <h1 className="profile-title">Your Profile</h1>
        <p className="mood-subtitle">Manage your personal information.</p>
      </header>

      {/* Cover and Avatar */}
      <div className="profile-cover animate-pop-in">
        <div className="avatar-wrapper" style={{ 
  position: 'relative', 
  cursor: 'pointer', 
  display: 'inline-block',
  overflow: 'hidden',
  borderRadius: '50%',
  width: '100px',
  height: '100px'
}} onClick={() => fileInputRef.current.click()}>
  {profileData.photo ? (
   <img 
  src={`http://localhost:3000${profileData.photo}`} 
  alt="Profile" 
  style={{ 
    width: '100px', 
    height: '100px', 
    borderRadius: '50%', 
    objectFit: 'cover',
    objectPosition: 'center',
    display: 'block'
  }}
/>
  ) : (
    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>
      {profileData.name?.charAt(0)?.toUpperCase()}
    </div>
  )}
  {/* <div style={{ position: 'absolute', bottom: '5px', right: '0px', background: 'var(--primary)', borderRadius: '50%', padding: '5px', color: 'white', display: 'flex' }}>
    <FiCamera size={12} />
  </div> */}
</div>
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handlePhotoUpload} />
        <div className="profile-header-info">
          <h2 className="profile-name">{profileData.name}</h2>
          <span className="profile-role">Member</span>
        </div>
      </div>

      {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '16px' }}>{success}</p>}

      <div className="profile-layout-grid">
        <div className="glass-card settings-section animate-slide-up animate-stagger-1">
          <h3 className="section-title">
            <FiUser /> Personal Details
            <button
              className={`btn ${isEditing ? 'btn-primary' : 'btn-outline'} ml-auto`}
              style={{ padding: "8px 16px", marginLeft: "auto", fontSize: "0.9rem" }}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? <><FiSave /> Save</> : <><FiEdit3 /> Edit</>}
            </button>
          </h3>

          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input name="name" type="text" className="form-input" value={profileData.name} onChange={handleChange} disabled={!isEditing} />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input name="email" type="email" className="form-input" value={profileData.email} disabled={true} style={{ opacity: 0.6 }} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age</label>
              <input name="age" type="number" className="form-input" value={profileData.age} onChange={handleChange} disabled={!isEditing} />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select name="gender" className="form-input" value={profileData.gender} onChange={handleChange} disabled={!isEditing}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="glass-card settings-section animate-slide-up animate-stagger-2">
          <h3 className="section-title"><FiActivity /> Your Journey</h3>
          <div className="activity-stat">
            <div className="act-icon act-blue"><FiSmile /></div>
            <div className="act-details">
              <h4>Mood Tracker</h4>
              <p>Keep logging your moods daily!</p>
            </div>
          </div>
          <div className="activity-stat">
            <div className="act-icon act-orange"><FiActivity /></div>
            <div className="act-details">
              <h4>Self Assessment</h4>
              <p>Take quizzes to track your progress.</p>
            </div>
          </div>
          <div className="activity-stat" style={{ marginBottom: "32px" }}>
            <div className="act-icon act-green"><FiBookOpen /></div>
            <div className="act-details">
              <h4>Resources</h4>
              <p>Read articles for mental wellness.</p>
            </div>
          </div>
          <button className="btn btn-outline w-full" style={{ color: "var(--danger)", borderColor: "var(--danger)", marginTop: "auto" }} onClick={handleLogout}>
            <FiLogOut /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;