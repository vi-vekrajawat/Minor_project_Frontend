
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function AdminProfile() {
  const user = getCurrentUser();
  const [profile, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Upload selected photo
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

  // Update profile info
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

  // Format join date nicely
  const formattedJoinDate = user.joindate
    ? new Date(user.joindate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f0f0f0", overflowX: "hidden" }}>
      {/* Top Navbar */}
      <div
        className="d-flex justify-content-between align-items-center bg-primary text-white p-2 flex-wrap"
        style={{ width: "100vw" }}
      >
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/admin" className="mr-3 text-white" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/batch-management" className="mr-3 text-white" style={{ textDecoration: "none" }}>
            Batch Management
          </Link>
          <Link to="/admin-profile" className="text-white" style={{ textDecoration: "none" }}>
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
            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span className="ml-2">{user.name || "Admin"}</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div
          className="text-center bg-white"
          style={{
            boxShadow: "0px 0px 3px 0px grey",
            minHeight: "500px",
            width: "100%",
            maxWidth: "200px",
            flexShrink: 0,
          }}
        >
          <div className="mt-5">
            <Link to="/admin" className="mt-4 list-group-item list-group-item-action">
              Dashboard
            </Link>
            <Link to="/batch-management" className="mt-4 list-group-item list-group-item-action">
              Batch Management
            </Link>
            <Link to="/admin-profile" className="mt-4 list-group-item list-group-item-action">
              Profile
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-md-5 mt-4 mt-md-0 w-100 p-3 bg-white" style={{ boxShadow: "0px 0px 3px 0px grey", borderRadius: "5px" }}>
          <h2>Admin Profile</h2>
          <p>Manage your profile</p>

          <div className="d-flex flex-column flex-lg-row">
            {/* Profile Image Upload */}
            <div className="p-3 text-center" style={{ minWidth: 220 }}>
              <div
                style={{
                  position: "relative",
                  width: "200px",
                  height: "200px",
                  margin: "0 auto",
                }}
              >
                <img
                  src={
                    user?.profile
                      ? `${BASE_URL}/uploads/profile/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  style={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "95%",
                    left: "24%",
                    width: "50%",
                    background: "rgba(92, 252, 43, 0.9)",
                    color: "white",
                    textAlign: "center",
                    padding: "3px",
                    fontSize: "14px",
                    borderBottomRightRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Change Photo
                </div>
              </div>

              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleChange}
                disabled={loading}
              />

              <button
                onClick={uploadPhoto}
                className="btn btn-success mt-4"
                style={{ width: "200px", borderRadius: "8px" }}
                disabled={!profile || loading}
              >
                {loading ? "Uploading..." : "Upload Photo"}
              </button>
            </div>

            {/* Personal Info Section */}
            <div className="ml-lg-5 mt-4 mt-lg-0 p-3 flex-grow-1">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mt-2 font-weight-bold">Personal Information</p>
                <button
                  className="btn btn-primary ml-3"
                  onClick={() => setEditMode(!editMode)}
                  disabled={loading}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>
              <hr />

              <div>
                <div className="d-flex flex-wrap mt-3">
                  <div className="mr-5" style={{ minWidth: 150, flexGrow: 1 }}>
                    <p className="mb-1 font-weight-bold">Full Name</p>
                    {editMode ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p>{user?.name || "N/A"}</p>
                    )}
                  </div>
                  <div style={{ minWidth: 200, flexGrow: 1 }}>
                    <p className="mb-1 font-weight-bold">Email Address</p>
                    {editMode ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p>{user?.email || "N/A"}</p>
                    )}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-4">
                  <p className="mb-1 font-weight-bold">Bio</p>
                  {editMode ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="form-control"
                      rows={4}
                      disabled={loading}
                    />
                  ) : (
                    <p>{user.bio || "No bio added"}</p>
                  )}
                </div>

                <div className="d-flex flex-wrap mt-3">
                  <div style={{ minWidth: 150, flexGrow: 1 }}>
                    <p className="mb-1 font-weight-bold">Join Date</p>
                    <p>{formattedJoinDate}</p>
                  </div>
                  <div className="ml-5" style={{ minWidth: 150, flexGrow: 1 }}>
                    <p className="mb-1 font-weight-bold">Role</p>
                    <p>{user?.role || "Admin"}</p>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-3">
                  <button
                    className="btn btn-success"
                    onClick={updateProfileData}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
