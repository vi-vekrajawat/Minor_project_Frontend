
import axios from "axios";
import Backend from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function TeacherProfile() {
  const user = getCurrentUser();
  const [profile, setFile] = useState(null);

  const handleChange = (event) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const uploadPhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("profile", profile);
      const response = await axios.patch(
        `${Backend.STUDENT_PROFILE}/${user._id}`,
        formData
      );
      sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden", backgroundColor: "#f0f0f0" }}>
      
      {/* Header - Full Width */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/teacher-portal" className="text-white mr-3" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/create-assignment" className="text-white mr-3" style={{ textDecoration: "none" }}>
            Create Assignment
          </Link>
          <Link to="/teacher-profile" className="text-white" style={{ textDecoration: "none" }}>
            Profile
          </Link>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <img
            src={`http://localhost:3000/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span className="ml-2">{user.name}</span>
        </div>
      </div>

      {/* Sidebar + Main Content - Full Width */}
      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        
        {/* Sidebar */}
        <div
          className="text-center bg-white"
          style={{
            width: "200px",
            boxShadow: "0px 0px 3px grey",
            flexShrink: 0
          }}
        >
          <div className="mt-5">
            <Link to="/teacher-portal" className="list-group-item list-group-item-action mt-3">
              Dashboard
            </Link>
            <Link to="/create-assignment" className="list-group-item list-group-item-action mt-3">
              Create Assignment
            </Link>
            <Link to="/teacher-profile" className="list-group-item list-group-item-action mt-3">
              Profile
            </Link>
          </div>
        </div>

        {/* Main Profile Content */}
        <div className="flex-grow-1 p-4">
          <h2>Teacher Profile</h2>
          <p>Manage your profile</p>

          <div className="d-flex flex-column flex-lg-row">
            
            {/* Profile Image and Upload */}
            <div className="text-center">
              <img
                src={
                  user?.profile
                    ? `http://localhost:3000/uploads/profile/${user.profile}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                style={{ height: "200px", width: "200px", borderRadius: "50%", objectFit: "cover" }}
              />
              <input type="file" className="form-control mt-3" onChange={handleChange} />
              <button onClick={uploadPhoto} className="btn btn-success mt-3">
                Upload Photo
              </button>
            </div>

            {/* Personal Info */}
            <div
              className="ml-lg-5 mt-4 mt-lg-0 p-3 bg-white"
              style={{ boxShadow: "0px 0px 3px grey", borderRadius: "5px", flexGrow: 1 }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <p className="mt-2 font-weight-bold">Personal Information</p>
                <button className="btn btn-primary">Edit Profile</button>
              </div>
              <hr />
              <div>
                <div className="d-flex flex-wrap mt-3">
                  <div className="mr-5">
                    <p className="mb-1 font-weight-bold">Full Name</p>
                    <p>{user.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-weight-bold">Email Address</p>
                    <p>{user.email || "N/A"}</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap mt-3">
                  <div>
                    <p className="mb-1 font-weight-bold">Join Date</p>
                    <p>{user.date}</p>
                  </div>
                  <div className="ml-5">
                    <p className="mb-1 font-weight-bold">Role</p>
                    <p>{user.role || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default TeacherProfile;
