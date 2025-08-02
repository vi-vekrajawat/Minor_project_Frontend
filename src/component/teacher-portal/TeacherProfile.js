import axios from "axios";
import Backend from "../../apis/Backend";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function TeacherProfile() {
    // const user = JSON.parse(sessionStorage.getItem("current-user"))
    // console.log(user.role)
    const user = getCurrentUser()
    const [profile, setFile] = useState(null);
    const handleChange = (event) => {
        if (event.target.files)
            setFile(event.target.files[0]);
    }
    const uploadPhoto = async () => {
        try {
            // window.location.reload();
            let formData = new FormData();
            formData.append("profile", profile);
            let response = await axios.patch(Backend.STUDENT_PROFILE + `/${user._id}`, formData);
            sessionStorage.setItem("current-user", JSON.stringify(response.data.user));

            console.log(response.data)
        }
        catch (err) {
            console.log(err)
        }

    }
    return <>
        <>
            <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", width: "1250px" }}>
                {/* Top Navbar */}
                <div className="d-flex bg-primary text-white p-2 justify-content-between  align-items-center flex-wrap">
                    <div className="d-flex flex-wrap align-items-center">
                        <div className="mr-3 font-weight-bold">ITEP</div>
                        <Link to="/teacher-portal"  style={{textDecoration: "none",color: "inherit"}}  className="mr-3">Dashboard</Link>
                        <Link to="/create-assignment"  style={{textDecoration: "none",color: "inherit"}}  className="mr-3">Create Assignment</Link>
                        <Link to="/teacher-profile"  style={{textDecoration: "none",color: "inherit"}}  className="mr-3">Profile</Link>
                    </div>
                      <div className="d-flex" >
                    <div className="ml-3">
                        <img
                            src={`http://localhost:3000/uploads/profile/${user.profile}`}
                            alt="Profile"
                            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="ml-3 mt-2 ">{user.name}</div>
                </div>
                </div>

                <div className="d-flex flex-column flex-md-row ">
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
                            <Link to="/teacher-portal" className="mt-4 list-group-item list-group-item-action">
                                Dashboard
                            </Link>
                            <Link to="/create-assignment" className="mt-4 list-group-item list-group-item-action">
                               Create Assignment
                            </Link>
                            <Link className="mt-4 list-group-item list-group-item-action">
                                Profile
                            </Link>
                        </div>
                    </div>

                    <div className="ml-md-5 mt-4 mt-md-0 w-100">
                        <div>
                            <h2>Teacher Profile</h2>
                            <p>Manage your profile</p>
                        </div>

                        <div className="d-flex flex-column flex-lg-row">
                            <div
                                className="p-3 text-center"
                                style={{ height: "135px" }}
                            >

                                <div className="mr-2" style={{ width: "150px", height: "200px", borderRadius: "50%" }}>
                                    <img
                                        src={
                                            user?.profile
                                                ? `http://localhost:3000/uploads/profile/${user.profile}`
                                                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        }
                                        alt="Profile"
                                        style={{ height: "200px", width: "200px", borderRadius: "50%", objectFit: "cover" }}
                                    />
                                </div >
                                <input type="file" className="form-control mt-5" onChange={handleChange} ></input>
                                <button onClick={uploadPhoto} className="mt-5 btn btn-success">Upload Photo</button>
                            </div>

                            <div
                                className="ml-lg-5 mt-4 mt-lg-0 p-3 bg-white"
                                style={{ boxShadow: "0px 0px 3px 0px grey", borderRadius: "5px" }}
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
                                            {/* <p>{user.name}</p> */}
                                            <p>Vivek singh</p>
                                        </div>
                                        <div>
                                            <p className="mb-1 font-weight-bold">Email Address</p>
                                            {/* <p>{user.email}</p> */}
                                            <p>iamvivekrajawat@gmai.com</p>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-wrap mt-3">
                                        <div className="mt-3">
                                            <p className="mb-1 font-weight-bold">Join Date</p>
                                            <p>2025/2/5</p>
                                        </div>
                                        <div className="ml-5 mt-3">
                                            <p className="mb-1 font-weight-bold">Role</p>
                                            {/* <p>{user.role}</p> */}
                                            <p>Admin</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
        {/* } */}

        {/* export default Profile; */}

    </>
}

export default TeacherProfile