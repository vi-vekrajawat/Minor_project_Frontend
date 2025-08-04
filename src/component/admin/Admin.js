
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import AssignmentProvider, { AssignmentContext } from "../../context/AssignmentProvider";
import { BatchContext } from "../../context/BatchProvider";
import { getCurrentUser } from "../auth/Auth";

function Admin() {
    const [studnet, setStudnet] = useState([]);
    const { task } = useContext(AssignmentContext)
    const { batchState } = useContext(BatchContext)
    const user = getCurrentUser()
    // console.log(batch)
    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const response = await axios.get(backend.STUDENT_LIST);
        setStudnet(response.data.allStudents);
    };

    return (
        <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>

            {/* Header - Full Width */}
            <div
                className="d-flex justify-content-between align-items-center bg-primary text-white p-3"
                style={{ width: "100vw" }}
            >
                <div className="d-flex flex-wrap">
                    <div className="mr-3">ITEP</div>
                    <div className="mr-3">Dashboard</div>
                    <div className="mr-3">Batch Management</div>
                    <Link to="/admin-profile" className="text-white">Profile</Link>
                </div>
                <div className="d-flex mt-2 mt-md-0">
                    {/* <div className="mr-3">image</div> */}
                    <img
                                src={`${BASE_URL}/uploads/profile/${user.profile}`}
                                alt="Profile"
                                style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                              />
                    <div>{user.name}</div>
                </div>
            </div>

            {/* Sidebar + Main Content */}
            <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 50px)" }}>

                {/* Sidebar */}
                <div
                    style={{
                        width: "200px",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0px 0px 3px grey"
                    }}
                    className="text-center"
                >
                    <div className="mt-5">
                        <div className="list-group-item list-group-item-action mt-5">Dashboard</div>
                        <Link to="/batch-management" className="list-group-item list-group-item-action mt-5">Batch Management</Link>
                        <Link to="/admin-profile" className="list-group-item list-group-item-action mt-5">Profile</Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow-1 p-4">
                    <h2>Admin Dashboard</h2>
                    <p>Manage your educational platform</p>

                    {/* Cards Section */}
                    <div className="d-flex flex-wrap">
                        <div
                            className="text-center bg-primary text-white p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px" }}
                        >
                            <span>Total Batches</span><br />
                            <span>{batchState.length}</span>
                        </div>
                        <div
                            className="text-center bg-success text-white p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px" }}
                        >
                            <span>Total Students</span><br />
                            <span>{(studnet?.filter(user => user.role === 'student') || []).length}</span>                        </div>
                        <div
                            className="text-center p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px", backgroundColor: "pink" }}
                        >
                            <span>Total Teachers</span><br />
                            <span>{(studnet?.filter(user => user.role === 'teacher') || []).length}</span>                        </div>
                        <div
                            className="text-center p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px", backgroundColor: "orange" }}
                        >
                            <span>Active Assignments</span><br />
                            <span>{task.length}</span>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="mt-5 p-2" style={{ boxShadow: "0px 0px 3px grey" }}>
                        <div className="d-flex justify-content-between flex-wrap">
                            <h6><b>Recent Users</b></h6>
                            <div>
                                <Link to="/add-student" className="btn btn-primary mr-2">+ Add Users</Link>
                                <Link to="/excel-file" className="btn btn-primary">+ Upload File</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table mt-1">
                                <thead className="table-dark">
                                    <tr>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Role</td>
                                        <td>Batch</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studnet.map((data, index) => (
                                        <tr key={index}>
                                            <td>{data.name}</td>
                                            <td>{data.email}</td>
                                            <td>{data.role}</td>
                                            <td>{data.batch?.batchName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Admin;
