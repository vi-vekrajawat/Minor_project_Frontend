
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { AssignmentContext } from "../../context/AssignmentProvider";
import { BatchContext } from "../../context/BatchProvider";
import { BASE_URL } from "../../apis/Backend";

function TeacherPortal() {
    const { task } = useContext(AssignmentContext);
    const { batchState } = useContext(BatchContext);
    const user = getCurrentUser();
    const [selectedBatch, setSelectedBatch] = useState("all");
    const filteredAssignments = task.filter((assignment) => {
        return selectedBatch === "all" || assignment.batchId === selectedBatch;
    });

    return (
        <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f0f0f0", overflowX: "hidden" }}>
            <div className="row m-0 bg-primary text-white align-items-center p-2" style={{ minHeight: "50px" }}>
                <div className="col-12 col-lg-6 d-flex flex-wrap">
                    <div className="mr-3">ITEP</div>
                    <div className="mr-3">Dashboard</div>
                    <div className="mr-3">Create Assignment</div>
                    <div className="mr-3">Profile</div>
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-lg-end align-items-center mt-2 mt-lg-0">
                    <img
                        src={`${BASE_URL}/uploads/profile/${user.profile}`}
                        alt="Profile"
                        style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <span className="ml-2">{user.name}</span>
                </div>
            </div>
            <div className="row m-0">
                <div
                    className="col-12 col-md-3 col-lg-2 p-0 text-center"
                    style={{ boxShadow: "0px 0px 3px 0px grey", minHeight: "500px" }}
                >
                    <div className="mt-5">
                        <div className="mt-4 list-group-item list-group-item-action">Dashboard</div>
                        <Link to="/create-assignment" className="mt-4 list-group-item list-group-item-action">
                            Create Assignment
                        </Link>
                        <Link to="/teacher-profile" className="mt-4 list-group-item list-group-item-action">
                            Profile
                        </Link>
                        <Link to="/submitted" className="mt-4 list-group-item list-group-item-action">
                            Submitted Assignment
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-9 col-lg-10 p-3">
                    <h2>Teacher Dashboard</h2>
                    <p>Manage your classes and assignments</p>
                    <div className="d-flex flex-wrap">
                        <div className="text-center bg-primary text-white p-3 m-2 flex-fill" style={{ minWidth: "200px", maxWidth: "250px" }}>
                            <span>Total Batches</span>
                            <br />
                            <span>{batchState.length}</span>
                        </div>
                        <div className="text-center bg-success text-white p-3 m-2 flex-fill" style={{ minWidth: "200px", maxWidth: "250px" }}>
                            <span>Total Students</span>
                            <br />
                            <span>4</span>
                        </div>
                        <div className="text-center text-white p-3 m-2 flex-fill" style={{ minWidth: "200px", maxWidth: "250px", backgroundColor: "purple" }}>
                            <span>Total Assignment</span>
                            <br />
                            <span>{task.length}</span>
                        </div>
                        <div className="text-center text-white p-3 m-2 flex-fill" style={{ minWidth: "200px", maxWidth: "250px", backgroundColor: "orange" }}>
                            <span>Pending Reviews</span>
                            <br />
                            <span>not working</span>
                        </div>
                    </div>
                    <div className="mt-4 p-2" style={{ boxShadow: "0px 0px 3px 0px grey", maxHeight: "300px", overflowY: "auto" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6><b>Recent Assignment</b></h6>
                            <select
                                className="form-select mr-2 btn btn-success"
                                value={selectedBatch}
                                onChange={(e) => setSelectedBatch(e.target.value)}
                                style={{ maxWidth: "200px" }}
                            >
                                <option value="all">All Batches</option>
                                {batchState.map((batch, index) => (
                                    <option key={index} value={batch._id} className="btn btn-dark">
                                        {batch.batchName}
                                    </option>
                                ))}
                            </select>

                            <Link to="/create-assignment" className="btn btn-primary">
                                + Create assignment
                            </Link>
                        </div>

                        {/* Assignment List */}
                        {filteredAssignments.length > 0 ? (
                            filteredAssignments.map((task, index) => {
                                const batchName =
                                    batchState.find((b) => b._id === task.batchId)?.batchName || "Unknown Batch";

                                return (
                                    <div key={index} className="mt-3 p-2" style={{ border: "0.1px solid grey" }}>
                                        <p><b>Title :</b> {task.title}</p>
                                        <p><b>Description :</b> {task.description}</p>
                                        <p><b>Subject :</b> {task.subject}</p>
                                        <p><b>DeadLine :</b> {task.deadline?.slice(0, 10)}</p>
                                        <p>
                                            <b>File :</b>{" "}
                                            {task.file ? (
                                                <a
                                                    href={`${BASE_URL}/assignment/files/${task.file}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {task.file}
                                                </a>
                                            ) : (
                                                "No file"
                                            )}
                                        </p>
                                        <p><b>Batch :</b> {batchName}</p>
                                        <p><b>Created by :</b> {user.name}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="p-2">No assignments found for this batch.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherPortal;
