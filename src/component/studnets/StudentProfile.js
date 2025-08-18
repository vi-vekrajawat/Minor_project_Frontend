

import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { BatchContext } from "../../context/BatchProvider";

function StudentProfile() {
  const user = getCurrentUser();
  const { batchState } = useContext(BatchContext);

  const [profile, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const currentUserBatch = batchState.find((batch) => batch._id === user.batch);

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
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f4f7f9", overflowX: "hidden" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 font-weight-bold" style={{ fontSize: "1.3rem" }}>ITEP</div>
          <Link to="/student" className="mr-3 text-white nav-link">Dashboard</Link>
          <Link to="/submission" className="mr-3 text-white nav-link">My Submissions</Link>
          <Link to="/student-profile" className="text-white nav-link">Profile</Link>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <img
            src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            style={{ height: "45px", width: "45px", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
          />
          <span className="ml-2 font-weight-medium text-white">{user.name || "Student"}</span>
        </div>
      </div>

      {/* Layout */}
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <div className="text-center bg-white shadow-sm" style={{ minHeight: "100vh", width: "100%", maxWidth: "220px", flexShrink: 0 }}>
          <div className="mt-5 d-flex flex-column align-items-start">
            <Link to="/student" className="list-group-item list-group-item-action w-100">Dashboard</Link>
            <Link to="/submission" className="list-group-item list-group-item-action w-100">My Submissions</Link>
            <Link to="/student-profile" className="list-group-item list-group-item-action w-100 active">Profile</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <div className="card shadow-sm p-4" style={{ borderRadius: "10px" }}>
            <h2 className="mb-2">Student Profile</h2>
            <p className="text-muted">Manage your account and personal information</p>

            <div className="d-flex flex-column flex-lg-row mt-4">
              {/* Profile Image */}
              <div className="text-center p-3" style={{ minWidth: 250 }}>
                <div className="mx-auto" style={{ width: 200, height: 200 }}>
                  <img
                    src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                    alt="Profile"
                    className="rounded-circle shadow"
                    style={{ width: 200, height: 200, objectFit: "cover" }}
                  />
                </div>

                <div
                  onClick={() => document.getElementById("fileInput").click()}
                  style={{
                    marginTop: "10px",
                    display: "inline-block",
                    background: "#28a745",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)"
                  }}
                >
                  Change Photo
                </div>

                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleChange} disabled={loading} />

                <button
                  className="btn btn-success mt-3 w-100"
                  onClick={uploadPhoto}
                  disabled={!profile || loading}
                  style={{ borderRadius: "8px", fontWeight: "500" }}
                >
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              {/* Personal Info Boxes */}
              <div className="flex-grow-1 ml-lg-5 mt-4 mt-lg-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 text-dark">Personal Information</h5>
                  <button
                    className={`btn ${editMode ? "btn-secondary" : "btn-primary"}`}
                    onClick={() => setEditMode(!editMode)}
                    disabled={loading}
                  >
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="d-flex flex-wrap">
                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Full Name</p>
                    {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" disabled={loading} /> : <p className="text-dark">{name || "N/A"}</p>}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Email</p>
                    {editMode ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" disabled={loading} /> : <p className="text-dark">{email || "N/A"}</p>}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Bio</p>
                    {editMode ? <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control" rows={3} disabled={loading} /> : <p className="text-dark">{bio || "No bio added"}</p>}
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Role</p>
                    <p className="text-dark">{user?.role || "Student"}</p>
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Join Date</p>
                    <p className="text-dark">{formattedJoinDate}</p>
                  </div>

                  <div className="p-3 m-2 bg-white shadow-sm rounded flex-fill" style={{ minWidth: "180px" }}>
                    <p className="mb-1 font-weight-bold text-dark">Batch</p>
                    <p className="text-dark">{currentUserBatch?.batchName || "Not Assigned"}</p>
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

export default StudentProfile;

