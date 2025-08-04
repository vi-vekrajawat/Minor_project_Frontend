
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function StudentProfile() {
  const user = getCurrentUser();
  const [profile, setFile] = useState(null);

  const handleChange = (event) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const uploadPhoto = async () => {
    try {
      let formData = new FormData();
      formData.append("profile", profile);
      const response = await axios.patch(`${Backend.STUDENT_PROFILE}/${user._id}`, formData);
      sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
      
      {/* Top Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap align-items-center">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/student" className="mr-3 text-white" style={{ textDecoration: "none" }}>Dashboard</Link>
          <Link to="/submission" className="mr-3 text-white" style={{ textDecoration: "none" }}>My Submissions</Link>
          <Link className="text-white" style={{ textDecoration: "none" }}>Profile</Link>
        </div>
        <div className="d-flex align-items-center mt-2 mt-md-0">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span className="ml-2">{user.name}</span>
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
            maxWidth: "200px"
          }}
        >
          <div className="mt-5">
            <Link to="/student" className="list-group-item list-group-item-action mt-3">Dashboard</Link>
            <Link to="/submission" className="list-group-item list-group-item-action mt-3">My Submissions</Link>
            <Link className="list-group-item list-group-item-action mt-3">Profile</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2>Student Profile</h2>
          <p>Manage your profile</p>

          <div className="d-flex flex-column flex-lg-row">
            {/* Left Card: Profile Image */}
            <div className="p-3 text-center">
              <div style={{ width: "200px", height: "200px", margin: "auto" }}>
                <img
                  src={
                    user?.profile
                      ? `${BASE_URL}/uploads/profile/${user.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  style={{ height: "200px", width: "200px", borderRadius: "50%", objectFit: "cover" }}
                />
              </div>
              <input type="file" className="form-control mt-4" onChange={handleChange} />
              <button onClick={uploadPhoto} className="mt-3 btn btn-success w-100">Upload Photo</button>
            </div>

            {/* Right Card: Personal Info */}
            <div
              className="ml-lg-5 mt-4 mt-lg-0 p-3 bg-white flex-grow-1"
              style={{ boxShadow: "0px 0px 3px grey", borderRadius: "5px" }}
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
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-weight-bold">Email Address</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <div className="d-flex flex-wrap mt-3">
                  <div className="mr-5">
                    <p className="mb-1 font-weight-bold">Batch</p>
                    <p>{user.batch}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-weight-bold">Role</p>
                    <p>{user.role}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="mb-1 font-weight-bold">Join Date</p>
                  <p>2025/2/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
