
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { AssignmentContext } from "../../context/AssignmentProvider";
import { BatchContext } from "../../context/BatchProvider";
import Backend, { BASE_URL } from "../../apis/Backend";
import axios from "axios";
import "./TeacherPortal.css";

function TeacherPortal() {
  const { task } = useContext(AssignmentContext);
  const { batchState } = useContext(BatchContext);
  const [assignment, setAssignment] = useState([]);
  const user = getCurrentUser();

  const [selectedBatch, setSelectedBatch] = useState("all");
  const [activeTab, setActiveTab] = useState("students"); // 👈 NEW toggle state

  useEffect(() => {
    getAssignmentbyId();
  }, []);

  const getAssignmentbyId = async () => {
    try {
      const response = await axios.get(
        `${Backend.ASSIGNMENT_TEACHER_BY_ID}/${user._id}`
      );
      setAssignment(response.data.findAssignment || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const totalStudents = batchState.reduce(
    (acc, batch) => acc + (batch.students?.length || 0),
    0
  );

  const teacherAssignments = assignment.filter(
    (assignment) => assignment.teacherId === user._id
  );

  const filteredAssignments = teacherAssignments.filter(
    (assignment) =>
      selectedBatch === "all" || assignment.batchId === selectedBatch
  );

  const teacherBatches = batchState.filter(
    (batch) => batch.teachers && batch.teachers.some((t) => t._id === user._id)
  );
  const totalStudents1 = teacherBatches.reduce(
  (acc, batch) => acc + (batch.students?.length || 0),
  0
);

  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Header */}
      <div className="teacher-header">
        <div>
          <span className="me-3">ITEP</span>
          <Link to="/create-assignment" className="text-white me-3 ml-3">
            Create Assignment
          </Link>
          <Link to="/teacher-profile" className="text-white ml-3">
            Profile
          </Link>
        </div>
        <div>
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
          />
          <span>{user.name}</span>
        </div>
      </div>

      <div style={{ display: "flex", width: "100vw", minHeight: "calc(100vh - 50px)" }}>
        {/* Sidebar */}
        <div className="teacher-sidebar text-center">
          <Link to="/teacher-portal" className="list-group-item list-group-item-action mt-5 active">
            Dashboard
          </Link>
          <Link to="/create-assignment" className="list-group-item list-group-item-action mt-5 ">
            Create Assignment
          </Link>
          <Link to="/teacher-profile"className="list-group-item list-group-item-action mt-5 ">
            Profile
          </Link>
          <Link to="/submitted" className="list-group-item list-group-item-action mt-5 " >
            Submitted Assignment
          </Link>
        </div>

        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <h2>Teacher Dashboard</h2>
          <p>Manage your classes and assignments</p>

          {/* Stats Cards */}
          <div className="d-flex justify-content-between flex-wrap" >
            <div className="info-card bg-primary">
              <div>Total Batches</div>
              <div>{batchState.length}</div>
            </div>
            <div className="info-card bg-success">
              <div>Total Students</div>
              <div>{totalStudents1}</div>
            <div></div>
            </div>
            <div className="info-card bg-info">
              <div>Total Assignments</div>
              <div>{teacherAssignments.length}</div>
            </div>
            {/* <div className="info-card bg-secondary">
              <div>Pending Reviews</div>
              <div>Not Working</div>
            </div> */}
          </div>

          {/* Toggle Buttons */}
          <div className="mt-4">
            <button
              className={`btn me-2 ${activeTab === "students" ? "btn-success" : "btn-success"}`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`btn ${activeTab === "assignments" ? "btn-warning" : "btn-warning"}`}
              onClick={() => setActiveTab("assignments")}
            >
              Assignments
            </button>
          </div>

          {/* Students Section */}
          {activeTab === "students" && (
            <div className="students-container mt-4">
              <h5>Students in Your Batches</h5>
              {teacherBatches.length > 0 ? (
                teacherBatches.map((batch) => (
                  <div key={batch._id} style={{ marginBottom: "20px" }}>
                    <h6>{batch.batchName}</h6>
                    {batch.students && batch.students.length > 0 ? (
                      <table className="table table-striped">
                        <thead className="table-dark">
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Batch</th>
                          </tr>
                        </thead>
                        <tbody>
                          {batch.students.map((student, idx) => (
                            <tr key={idx}>
                              <td>{student.name}</td>
                              <td>{student.email || "-"}</td>
                              <td>{batch.batchName}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>No students in this batch.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No batches found.</p>
              )}
            </div>
          )}

          {/* Assignments Section */}
          {activeTab === "assignments" && (
            <div className="recent-assignments mt-4">
              <div className="d-flex justify-content-between align-items-center">
                <h6><b>Recent Assignments</b></h6>
                <Link to="/create-assignment" className="btn btn-primary">
                  + Create Assignment
                </Link>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table className="table mt-3">
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
                        const batchName = batchState.find((b) => b._id === task.batchId)?.batchName || "Unknown";
                        return (
                          <tr key={index}>
                            <td>{task.title}</td>
                            <td>{task.subject}</td>
                            <td>{task.deadline?.slice(0, 10)}</td>
                            <td>{batchName}</td>
                            <td>
                              {task.file ? (
                                <a
                                  href={`${BASE_URL}/assignment/files/${task.file}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Download
                                </a>
                              ) : "No File"}
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
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherPortal;
