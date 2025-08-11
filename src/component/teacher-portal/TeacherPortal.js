
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

    const totalStudents = batchState.reduce(
        (acc, batch) => acc + (batch.students?.length || 0),
        0
    );

    const [selectedBatch, setSelectedBatch] = useState("all");

    const filteredAssignments = task.filter(
        (assignment) =>
            selectedBatch === "all" || assignment.batchId === selectedBatch
    );

    return (
        <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
            {/* Header */}
            <div
                className="d-flex justify-content-between align-items-center bg-primary text-white p-3"
                style={{ width: "100vw" }}
            >
                <div className="d-flex flex-wrap">
                    <div className="mr-3">ITEP</div>
                    <div className="mr-3">Dashboard</div>
                    <Link to="/create-assignment" className="text-white mr-3">
                        Create Assignment
                    </Link>
                    <Link to="/teacher-profile" className="text-white">
                        Profile
                    </Link>
                </div>
                <div className="d-flex mt-2 mt-md-0 align-items-center">
                    <img
                        src={`${BASE_URL}/uploads/profile/${user.profile}`}
                        alt="Profile"
                        style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginRight: "10px",
                        }}
                    />
                    <div>{user.name}</div>
                </div>
            </div>

            {/* Sidebar + Content */}
            <div
                className="d-flex flex-column flex-md-row"
                style={{ width: "100vw", minHeight: "calc(100vh - 50px)" }}
            >
                {/* Sidebar */}
                <div
                    style={{
                        width: "200px",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "0px 0px 3px grey",
                    }}
                    className="text-center"
                >
                    <div className="mt-5">
                        <div className="list-group-item list-group-item-action mt-5">
                            Dashboard
                        </div>
                        <Link
                            to="/create-assignment"
                            className="list-group-item list-group-item-action mt-5"
                        >
                            Create Assignment
                        </Link>
                        <Link
                            to="/teacher-profile"
                            className="list-group-item list-group-item-action mt-5"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/submitted"
                            className="list-group-item list-group-item-action mt-5"
                        >
                            Submitted Assignment
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow-1 p-4">
                    <h2>Teacher Dashboard</h2>
                    <p>Manage your classes and assignments</p>

                    {/* Stats Cards */}
                    <div className="d-flex flex-wrap">
                        <div
                            className="text-center bg-primary text-white p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px" }}
                        >
                            <span>Total Batches</span>
                            <br />
                            <span>{batchState.length}</span>
                        </div>
                        <div
                            className="text-center bg-success text-white p-3 m-2 flex-fill"
                            style={{ minWidth: "200px", maxWidth: "250px" }}
                        >
                            <span>Total Students</span>
                            <br />
                            <span>{totalStudents}</span>
                        </div>
                        <div
                            className="text-center text-white p-3 m-2 flex-fill"
                            style={{
                                minWidth: "200px",
                                maxWidth: "250px",
                                backgroundColor: "purple",
                            }}
                        >
                            <span>Total Assignments</span>
                            <br />
                            <span>{task.length}</span>
                        </div>
                        <div
                            className="text-center text-white p-3 m-2 flex-fill"
                            style={{
                                minWidth: "200px",
                                maxWidth: "250px",
                                backgroundColor: "orange",
                            }}
                        >
                            <span>Pending Reviews</span>
                            <br />
                            <span>Not Working</span>
                        </div>
                    </div>

                    {/* Assignment List */}
                    <div
                        className="mt-5 p-2"
                        style={{ boxShadow: "0px 0px 3px grey" }}
                    >
                        <div className="d-flex justify-content-between flex-wrap">
                            <h6>
                                <b>Recent Assignments</b>
                            </h6>
                            <div className="d-flex">
                                <select
                                    className="form-select mr-2 btn btn-success"
                                    value={selectedBatch}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                >
                                    <option value="all">All Batches</option>
                                    {batchState.map((batch, index) => (
                                        <option key={index} value={batch._id}>
                                            {batch.batchName}
                                        </option>
                                    ))}
                                </select>
                                <Link
                                    to="/create-assignment"
                                    className="btn btn-primary"
                                >
                                    + Create Assignment
                                </Link>
                            </div>
                        </div>

                        <div className="table-responsive mt-3">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Title</th>
                                        <th>Subject</th>
                                        <th>Deadline</th>
                                        <th>Batch</th>
                                        <th>File</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAssignments.length > 0 ? (
                                        filteredAssignments.map((task, index) => {
                                            const batchName =
                                                batchState.find(
                                                    (b) => b._id === task.batchId
                                                )?.batchName || "Unknown";
                                            return (
                                                <tr key={index}>
                                                    <td>{task.title}</td>
                                                    <td>{task.subject}</td>
                                                    <td>
                                                        {task.deadline?.slice(0, 10)}
                                                    </td>
                                                    <td>{batchName}</td>
                                                    <td>
                                                        {task.file ? (
                                                            <a
                                                                href={`${BASE_URL}/assignment/files/${task.file}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {task.file}
                                                            </a>
                                                        ) : (
                                                            "No File"
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">
                                                No assignments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherPortal;
