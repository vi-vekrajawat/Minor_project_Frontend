import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { BatchContext } from "../../context/BatchProvider";
import "./StudentProfile.css";

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
    <div className="profile-container">
      <div className="profile-header">
        <div className="header-links">
          <div>ITEP</div>
          <Link to="/student">Dashboard</Link>
          <Link to="/submission">My Submissions</Link>
          <Link to="/student-profile">Profile</Link>
        </div>
        <div className="header-profile">
          <img
            src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
          />
          <span>{user.name || "Student"}</span>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row">
       <div className="text-center bg-white shadow-sm " style={{minWidth:"200px"}}>
          <div className="mt-5 d-flex flex-column align-items-start">
            <Link
              to="/student"
              className="list-group-item list-group-item-action w-100"
            >
              Dashboard
            </Link>
            <Link
              to="/submission"
              className="list-group-item list-group-item-action w-100 "
            >
              My Assignment
            </Link>
            <Link
              to="/student-profile"
              className="list-group-item list-group-item-action w-100 active"
            >
              Profile
            </Link>
          </div>
        </div>
        <div className="profile-card">
          <div className="profile-card-inner">
            <h2>Student Profile</h2>
            <p>Manage your account and personal information</p>

            <div className="d-flex flex-column flex-lg-row mt-4">
              <div className="profile-photo-section">
                <img
                  src={user?.profile ? `${BASE_URL}/uploads/profile/${user.profile}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                  alt="Profile"
                />
                <div className="change-photo-btn" onClick={() => document.getElementById("fileInput").click()}>
                  Change Photo
                </div>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleChange} disabled={loading} />
                <button className="upload-btn" onClick={uploadPhoto} disabled={!profile || loading}>
                  {loading ? "Uploading..." : "Upload Photo"}
                </button>
              </div>

              <div className="profile-info-section">
                <div className="profile-info-header">
                  <h5>Personal Information</h5>
                  <button className={`btn ${editMode ? "btn-secondary" : "btn-primary"}`} onClick={() => setEditMode(!editMode)} disabled={loading}>
                    {editMode ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <div className="profile-info-fields">
                  <div className="info-card">
                    <p className="label">Full Name</p>
                    {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" disabled={loading} /> : <p className="value">{name || "N/A"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Email</p>
                    {editMode ? <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" disabled={loading} /> : <p className="value">{email || "N/A"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Bio</p>
                    {editMode ? <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="form-control" rows={3} disabled={loading} /> : <p className="value">{bio || "No bio added"}</p>}
                  </div>

                  <div className="info-card">
                    <p className="label">Role</p>
                    <p className="value">{user?.role || "Student"}</p>
                  </div>

                  <div className="info-card">
                    <p className="label">Join Date</p>
                    <p className="value">{formattedJoinDate}</p>
                  </div>

                  <div className="info-card">
                    <p className="label">Batch</p>
                    <p className="value">{currentUserBatch?.batchName || "Not Assigned"}</p>
                  </div>
                </div>

                {editMode && <button className="btn btn-success mt-3" onClick={updateProfileData} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
