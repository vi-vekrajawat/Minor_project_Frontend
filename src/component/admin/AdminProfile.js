
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function AdminProfile() {
    const user = getCurrentUser();
    const [profile, setFile] = useState(null);

    // Handle file selection
    const handleChange = (event) => {
        if (event.target.files) setFile(event.target.files[0]);
    };

    // Upload selected photo
    const uploadPhoto = async () => {
        try {
            let formData = new FormData();
            formData.append("profile", profile);
            let response = await axios.patch(Backend.STUDENT_PROFILE + `/${user._id}`, formData);
            sessionStorage.setItem("current-user", JSON.stringify(response.data.user));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f0f0f0", overflowX: "hidden" }}>

            {/* Top Navbar */}
            <div
                className="d-flex justify-content-between align-items-center bg-primary text-white p-2 flex-wrap"
                style={{ width: "100vw" }}
            >
                <div className="d-flex flex-wrap align-items-center">
                    <div className="mr-3 font-weight-bold">ITEP</div>
                    <div className="mr-3">Dashboard</div>
                    <div className="mr-3">Batch Management</div>
                    <div className="mr-3">Profile</div>
                </div>
                <div className="d-flex align-items-center mt-2 mt-md-0">
                    <div className="mr-3">image</div>
                    <div className="mr-3">Admin Name</div>
                </div>
            </div>

            {/* Main Layout */}
            <div className="d-flex flex-column flex-md-row" style={{ width: "100vw" }}>

                {/* Sidebar */}
                <div
                    className="text-center bg-white"
                    style={{
                        boxShadow: "0px 0px 3px 0px grey",
                        minHeight: "500px",
                        width: "100%",
                        maxWidth: "200px",
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
                <div className="ml-md-5 mt-4 mt-md-0 w-100 p-3">
                    <h2>Admin Profile</h2>
                    <p>Manage your profile</p>

                    <div className="d-flex flex-column flex-lg-row">

                        {/* Improved Photo Upload Section */}
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

                        {/* Personal Info Section */}
                        <div
                            className="ml-lg-5 mt-4 mt-lg-0 p-3 bg-white"
                            style={{ boxShadow: "0px 0px 3px 0px grey", borderRadius: "5px", flexGrow: 1 }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mt-2 font-weight-bold">Personal Information</p>
                                <button className="btn btn-primary ml-3">Edit Profile</button>
                            </div>
                            <hr />
                            <div>
                                <div className="d-flex flex-wrap mt-3">
                                    <div className="mr-5">
                                        <p className="mb-1 font-weight-bold">Full Name</p>
                                        <p>{user?.name || "Vivek Singh"}</p>
                                    </div>
                                    <div>
                                        <p className="mb-1 font-weight-bold">Email Address</p>
                                        <p>{user?.email || "iamvivekrajawat@gmail.com"}</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-wrap mt-3">
                                    <div className="mt-3">
                                        <p className="mb-1 font-weight-bold">Join Date</p>
                                        <p>{user?.joinDate || "2025/2/5"}</p>
                                    </div>
                                    <div className="ml-5 mt-3">
                                        <p className="mb-1 font-weight-bold">Role</p>
                                        <p>{user?.role || "Admin"}</p>
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

export default AdminProfile;
