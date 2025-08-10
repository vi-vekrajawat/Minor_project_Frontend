
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
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [loading, setLoading] = useState(false);

  const currentUserBatch = batchState.find((batch) => batch._id === user.batch);

  // Handle profile photo selection
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Upload profile photo
  const uploadPhoto = async () => {
    if (!profile) {
      alert("Please select a photo first.");
      return;
    }
    setLoading(true);
    try {
      let formData = new FormData();
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
      alert("Failed to upload photo.");
    } finally {
      setLoading(false);
    }
  };

  // Update profile info (name, email, bio)
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
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Format date nicely
  const formattedJoinDate = user.joindate
    ? new Date(user.joindate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
      }}
    >
      {/* Top Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link
            to="/student"
            className="mr-3 text-white"
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <Link
            to="/submission"
            className="mr-3 text-white"
            style={{ textDecoration: "none" }}
          >
            My Submissions
          </Link>
          <Link className="text-white" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <img
            src={
              user.profile
                ? `${BASE_URL}/uploads/profile/${user.profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="Profile"
            style={{
              height: 40,
              width: 40,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="ml-2 font-weight-semibold">{user.name}</span>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <div
          className="text-center bg-white"
          style={{
            boxShadow: "0px 0px 3px grey",
            minHeight: "500px",
            width: "100%",
            maxWidth: "200px",
          }}
        >
          <div className="mt-5">
            <Link
              to="/student"
              className="list-group-item list-group-item-action mt-3"
            >
              Dashboard
            </Link>
            <Link
              to="/submission"
              className="list-group-item list-group-item-action mt-3"
            >
              My Submissions
            </Link>
            <Link className="list-group-item list-group-item-action mt-3">
              Profile
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-4"
          style={{ maxWidth: "900px", margin: "0 auto" }}
        >
          <h2>Student Profile</h2>
          <p>Manage your profile</p>

          <div className="d-flex flex-column flex-lg-row">
            {/* Profile Image */}
                       <div className="p-3 text-center">
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
                                {/* Hover Overlay */}
                                <div
                                    style={{
                                        position: "absolute",
                                        // bottom: "0",
                                        top:"95%",
                                        left: "24%",
                                        width: "50%",
                                        background: "rgba(92, 252, 43, 0.9)",
                                        color: "white",
                                        textAlign: "center",
                                        padding: "3px",
                                        fontSize: "14px",
                                        // borderBottomLeftRadius: "50%",
                                        borderBottomRightRadius: "50%",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => document.getElementById("fileInput").click()}
                                >
                                    Change Photo
                                </div>
                            </div>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />

                            {/* Upload Button */}
                            <button
                                onClick={uploadPhoto}
                                className="btn btn-success mt-4"
                                style={{ width: "200px", borderRadius: "8px" }}
                            >
                                Upload Photo
                            </button>
                        </div>

            {/* Personal Info */}
            <div
              className="ml-lg-5 mt-4 mt-lg-0 p-4 bg-white flex-grow-1"
              style={{
                boxShadow: "0px 0px 5px rgba(0,0,0,0.15)",
                borderRadius: 8,
                minWidth: 300,
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="font-weight-bold mb-0">Personal Information</h5>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setEditMode(!editMode)}
                  disabled={loading}
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <hr />

              <div>
                {/* Name + Email */}
                <div className="d-flex flex-wrap mt-3">
                  <div className="mr-4 flex-grow-1 min-width-200">
                    <label className="font-weight-bold" htmlFor="nameInput">
                      Full Name
                    </label>
                    {editMode ? (
                      <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p>{user.name}</p>
                    )}
                  </div>

                  <div className="flex-grow-1 min-width-200">
                    <label className="font-weight-bold" htmlFor="emailInput">
                      Email Address
                    </label>
                    {editMode ? (
                      <input
                        id="emailInput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        disabled={loading}
                      />
                    ) : (
                      <p>{user.email}</p>
                    )}
                  </div>
                </div>

                {/* Role + Bio */}
                <div className="d-flex flex-wrap mt-4 ">
                  <div className="mr-4 flex-grow-1 min-width-200">
                    <label className="font-weight-bold">Role</label>
                    <p>{user.role}</p>
                  </div>
                  <div className="flex-grow-1 min-width-200 ml-5">
                    <label className="font-weight-bold" htmlFor="bioInput">
                      Bio
                    </label>
                    {editMode ? (
                      <textarea
                        id="bioInput"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="form-control"
                        rows={3}
                        disabled={loading}
                      />
                    ) : (
                      <p>{user.bio || "No bio added"}</p>
                    )}
                  </div>
                </div>

                {/* Join Date + Batch Name */}
                <div className="mt-4 d-flex flex-wrap">
                  <div className="mr-5">
                    <label className="font-weight-bold">Join Date</label>
                    <p>{formattedJoinDate}</p>
                  </div>
                  <div className="ml-5">
                    <label className="font-weight-bold ">Batch</label>
                    <p>{currentUserBatch?.batchName || "Not Assigned"}</p>
                  </div>
                </div>
              </div>

              {editMode && (
                <div className="mt-4">
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

export default StudentProfile;
