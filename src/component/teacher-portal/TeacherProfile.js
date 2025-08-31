import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import "./TeacherProfile.css";

function TeacherProfile() {
  const user = getCurrentUser();

  const [profile, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
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
    if (!name.trim() || !email.trim())
      return alert("Name and email cannot be empty.");
    setLoading(true);
    try {
      const updateData = {
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
      };
      const response = await axios.patch(
        `${Backend.PROFILE_UPDATE}/${user._id}`,
        updateData
      );
      sessionStorage.setItem(
        "current-user",
        JSON.stringify(response.data.userProfile)
      );
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
    ? new Date(user.joindate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    : "N/A";

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <div className="header-links p-2">
          <div>ITEP</div>
          <Link to="/teacher-portal">Dashboard</Link>
          <Link to="/create-assignment">Create Assignment</Link>
          <Link to="/teacher-profile">Profile</Link>
        </div>
        <div className="header-profile mb-2">
          <img
            src={
              user?.profile
                ? `${BASE_URL}/uploads/profile/${user.profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
          />
          <span className="mr-3">{user.name || "Teacher"}</span>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <div className="text-center bg-white shadow-sm admin-sidebar">
          <div className="d-flex flex-column align-items-start">
            <Link
              to="/teacher-portal"
              className="list-group-item list-group-item-action w-100"
            >
              Dashboard
            </Link>
            <Link
              to="/create-assignment"
              className="list-group-item list-group-item-action w-100"
            >
              Create Assignment
            </Link>
            <Link

              className="list-group-item list-group-item-action w-100 active"
            >
              Profile
            </Link>
            <Link
to="/submitted"
              className="list-group-item list-group-item-action w-100 "
            >
              Submitted Assignment
            </Link>
          </div>
        </div>

        {/* Main Profile Card */}
        <div className="profile-card">
          <div className="profile-card-inner">
            <h2>Teacher Profile</h2>
            <p>Manage your account and personal information</p>

            <div className="d-flex flex-column flex-lg-row mt-4">
              {/* Photo */}
              <div className="profile-photo-section">
                <img
                  src={
                    user?.profile
                      ? `${BASE_URL}/uploads/profile/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                />
                <div
                  className="change-photo-btn"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Change Photo
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleChange}
                  disabled={loading}
                />
                <button
                  className="upload-btn"
                  onClick={uploadPhoto}
                  disabled={!profile || loading}
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              {/* Info */}
              <div className="profile-info-section">
                <div className="profile-info-header">
                  <h5>Personal Information</h5>
                  <button
                    className={`btn ${editMode ? "btn-secondary" : "btn-primary"
                      }`}
                    onClick={() => setEditMode(!editMode)}
                    disabled={loading}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="profile-info-fields">
                  <div className="info-card">
                    <p className="label">Full Name</p>
                    {editMode ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p className="value">{name || "N/A"}</p>
                    )}
                  </div>

                  <div className="info-card">
                    <p className="label">Email</p>
                    {editMode ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p className="value">{email || "N/A"}</p>
                    )}
                  </div>

                  <div className="info-card">
                    <p className="label">Bio</p>
                    {editMode ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="form-control"
                        rows={3}
                        disabled={loading}
                      />
                    ) : (
                      <p className="value">{bio || "No bio added"}</p>
                    )}
                  </div>

                  <div className="info-card">
                    <p className="label">Role</p>
                    <p className="value">{user?.role || "Teacher"}</p>
                  </div>

                  <div className="info-card">
                    <p className="label">Join Date</p>
                    <p className="value">{formattedJoinDate}</p>
                  </div>
                </div>

                {editMode && (
                  <button
                    className="btn btn-success mt-3"
                    onClick={updateProfileData}
                    disabled={loading}
                  >
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
