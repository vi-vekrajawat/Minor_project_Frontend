import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import "./AdminProfile.css"; 

function AdminProfile() {
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
    if (!profile) {
      alert("Please select a photo first.");
      return;
    }
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
    if (!name.trim() || !email.trim()) {
      alert("Name and email cannot be empty.");
      return;
    }
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
    <div className="admin-profile-page">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 admin-navbar">ITEP</div>
          <Link to="/admin" className="mr-3 text-white nav-link">
            Dashboard
          </Link>
          <Link to="/batch-management" className="mr-3 text-white nav-link">
            Batch Management
          </Link>
          <Link to="/admin-profile" className="text-white nav-link">
            Profile
          </Link>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <img
            src={
              user?.profile
                ? `${BASE_URL}/uploads/profile/${user.profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            className="admin-navbar-profile"
          />
          <span className="ml-2 font-weight-medium text-white">
            {user.name || "Admin"}
          </span>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <div className="text-center bg-white shadow-sm admin-sidebar">
          <div className="mt-5 d-flex flex-column align-items-start">
            <Link
              to="/admin"
              className="list-group-item list-group-item-action w-100"
            >
              Dashboard
            </Link>
            <Link
              to="/batch-management"
              className="list-group-item list-group-item-action w-100"
            >
              Batch Management
            </Link>
            <Link
              to="/admin-profile"
              className="list-group-item list-group-item-action w-100 active"
            >
              Profile
            </Link>
          </div>
        </div>

        <div className="flex-grow-1 p-4">
          <div className="card shadow-sm p-4 admin-card">
            <h2 className="mb-2">Admin Profile</h2>
            <p className="text-muted">
              Manage your account and personal information
            </p>

            <div className="d-flex flex-column flex-lg-row mt-4">
              <div className="text-center p-3" style={{ minWidth: 250 }}>
                <div className="mx-auto" style={{ width: 200, height: 200 }}>
                  <img
                    src={
                      user?.profile
                        ? `${BASE_URL}/uploads/profile/${user.profile}`
                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="Profile"
                    className="rounded-circle shadow admin-profile-image"
                  />
                </div>

                <div
                  onClick={() => document.getElementById("fileInput").click()}
                  className="change-photo-btn"
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
                  className="btn btn-success mt-3 w-100 upload-btn"
                  onClick={uploadPhoto}
                  disabled={!profile || loading}
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              <div className="flex-grow-1 ml-lg-5 mt-4 mt-lg-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-dark">Personal Information</h5>
                  <button
                    className={`btn ${
                      editMode ? "btn-secondary" : "btn-primary"
                    }`}
                    onClick={() => setEditMode(!editMode)}
                    disabled={loading}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="d-flex flex-wrap">
                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill info-box">
                    <p className="mb-1 font-weight-bold text-dark">Full Name</p>
                    {editMode ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p className="text-dark">{name || "N/A"}</p>
                    )}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill info-box">
                    <p className="mb-1 font-weight-bold text-dark">Email</p>
                    {editMode ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p className="text-dark">{email || "N/A"}</p>
                    )}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill info-box">
                    <p className="mb-1 font-weight-bold text-dark">Bio</p>
                    {editMode ? (
                      <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="form-control"
                        rows={3}
                        disabled={loading}
                      />
                    ) : (
                      <p className="text-dark">{bio || "No bio added"}</p>
                    )}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill info-box">
                    <p className="mb-1 font-weight-bold text-dark">Role</p>
                    <p className="text-dark">{user?.role || "Admin"}</p>
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill info-box">
                    <p className="mb-1 font-weight-bold text-dark">Join Date</p>
                    <p className="text-dark">{formattedJoinDate}</p>
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

export default AdminProfile;
