import "./TeacherProfile.css"
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function TeacherProfile() {
  const user = getCurrentUser();
  const [profile, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const uploadPhoto = async () => {
    if (!profile) return alert("Please select a photo first.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("profile", profile);
      const response = await axios.patch(
        `${Backend.STUDENT_PROFILE}/${user._id}`,
        formData
      );
      sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
      alert("Profile photo updated!");
      setFile(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  const updateProfileData = async () => {
    if (!name.trim() || !email.trim()) return alert("Name and email cannot be empty.");
    setLoading(true);
    try {
      const updateData = { name: name.trim(), email: email.trim(), bio: bio.trim() };
      const response = await axios.patch(
        `${Backend.PROFILE_UPDATE}/${user._id}`,
        updateData
      );
      sessionStorage.setItem("current-user", JSON.stringify(response.data.userProfile));
      alert("Profile info updated!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const formattedJoinDate = user.joindate
    ? new Date(user.joindate).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
    : "N/A";

  return (
    <div className="teacher-profile-page">
      {/* Header */}
      <div className="header-bar">
        <div className="header-left">
          <div className="logo">ITEP</div>
          <Link to="/teacher-portal" className="header-link">Dashboard</Link>
          <Link to="/create-assignment" className="header-link">Create Assignment</Link>
          <Link to="/teacher-profile" className="header-link active">Profile</Link>
        </div>
        <div className="header-right">
          <img
            src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            className="header-profile-img"
          />
          <span>{user.name || "Teacher"}</span>
        </div>
      </div>

      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <Link to="/teacher-portal" className="sidebar-link">Dashboard</Link>
          <Link to="/create-assignment" className="sidebar-link">Create Assignment</Link>
          <Link to="/teacher-profile" className="sidebar-link active">Profile</Link>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="card-box">
            <h2>Teacher Profile</h2>
            <p className="text-muted">Manage your account and personal information</p>

            <div className="profile-section">
              {/* Profile Photo */}
              <div className="profile-photo-box">
                <img
                  src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="Profile"
                  className="profile-photo"
                />
                <div className="change-photo-btn" onClick={() => document.getElementById("fileInput").click()}>
                  Change Photo
                </div>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleChange} disabled={loading} />
                <button className="btn btn-success mt-2 w-100" onClick={uploadPhoto} disabled={!profile || loading}>
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              {/* Info */}
              <div className="profile-info-box">
                <div className="info-header">
                  <h5>Personal Information</h5>
                  <button className={`btn ${editMode ? "btn-secondary" : "btn-primary"}`} onClick={() => setEditMode(!editMode)} disabled={loading}>
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <p className="label">Full Name</p>
                    {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" /> : <p>{name || "N/A"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Email</p>
                    {editMode ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" /> : <p>{email || "N/A"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Bio</p>
                    {editMode ? <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control" rows={3} /> : <p>{bio || "No bio added"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Role</p>
                    <p>{user?.role || "Teacher"}</p>
                  </div>

                  <div className="info-card">
                    <p className="label">Join Date</p>
                    <p>{formattedJoinDate}</p>
                  </div>
                </div>

                {editMode && (
                  <button className="btn btn-success mt-3" onClick={updateProfileData} disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
