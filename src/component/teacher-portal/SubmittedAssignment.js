
import axios from "axios";
import { useEffect, useState } from "react";
import Backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import "./SubmittedAssignment.css";

function SubmittedAssignment() {
  const [task, setTask] = useState([]);
  const [filterDay, setFilterDay] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterBatch, setFilterBatch] = useState("all");

  const user = getCurrentUser();

  useEffect(() => {
    loadSubmitAssignment();
  }, []);

const loadSubmitAssignment = async () => {
  try {
    const response = await axios.get(Backend.SUBMISSION);
    console.log("API RESPONSE:", response.data);

    const teacherAssignments = response.data.allass.filter((assignment) => {
      const teacherId = assignment?.assignmentId?.teacherId;
      const userId = user?._id;

      // ✅ Check if teacher is still part of the assignment's batch
      const batchTeachers = assignment?.batchId?.teachers || [];
      const isTeacherInBatch = batchTeachers.some(
        (t) => t.toString().trim() === userId?.toString().trim()
      );

      return teacherId?.toString().trim() === userId?.toString().trim() && isTeacherInBatch;
    });

    console.log("FILTERED ASSIGNMENTS:", teacherAssignments);
    setTask(teacherAssignments);
  } catch (err) {
    console.log(err);
  }
};

  const getFilteredAssignments = () => {
    return task.filter((a) => {
      if (!a.submittedAt) return false;
      const date = new Date(a.submittedAt);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });
      const month = date.toLocaleDateString("en-US", { month: "long" });

      if (filterDay !== "all" && day !== filterDay) return false;
      if (filterMonth !== "all" && month !== filterMonth) return false;
      if (filterBatch !== "all" && a.batchId?.batchName !== filterBatch)
        return false;

      return true;
    });
  };

  const filteredTasks = getFilteredAssignments();
  const batchOptions = [...new Set(task.map((a) => a.batchId?.batchName))];
  console.log("batch options", batchOptions);
  console.log("tasks", task);

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        overflowX: "hidden",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Header */}
      <div className="submitted-header">
        <div>
          <span>ITEP</span>
          <Link
            to="/teacher-portal"
            className="text-white"
            style={{ marginLeft: "15px", textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <Link
            to="/create-assignment"
            className="text-white"
            style={{ marginLeft: "15px", textDecoration: "none" }}
          >
            Create Assignment
          </Link>
          <Link
            to="/teacher-profile"
            className="text-white"
            style={{ marginLeft: "15px", textDecoration: "none" }}
          >
            Profile
          </Link>
          <Link
            to="/submitted"
            className="text-white"
            style={{ marginLeft: "15px", textDecoration: "none" }}
          >
            Submitted Assignment
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

      <div
        style={{
          display: "flex",
          width: "100vw",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        {/* Sidebar */}
        <div className="submitted-sidebar text-center">
        <div className="text-center bg-white shadow-sm admin-sidebar">
          <div className="mt-5 d-flex flex-column align-items-start">
            <Link
              to="/teacher-portal"
              className="list-group-item list-group-item-action w-100"
            >
              Dashboard
            </Link>
            <Link
              to="/create-assignment"
              className="list-group-item list-group-item-action w-100"
            >
              Create Assignment
            </Link>
            <Link
             to="/teacher-profile"
              className="list-group-item list-group-item-action w-100 "
            >
              Profile
            </Link>
            <Link
             
              className="list-group-item list-group-item-action w-100 active"
            >
              Submitted Assignment
            </Link>
          </div>
        </div>
        </div>

        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <h2>Submitted Assignments</h2>
          <p>View all student submissions</p>

          {/* Filters */}
          <div className="filters">
            <div>
              <label>Day:</label>
              <select
                className="form-control"
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
              >
                <option value="all">All</option>
                {[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Month:</label>
              <select
                className="form-control"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              >
                <option value="all">All</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Batch:</label>
              <select
                className="form-control"
                value={filterBatch}
                onChange={(e) => setFilterBatch(e.target.value)}
              >
                <option value="all">All</option>
                {batchOptions.map(
                  (batch, i) =>
                    batch && (
                      <option key={i} value={batch}>
                        {batch}
                      </option>
                    )
                )}
              </select>
            </div>
          </div>

          <div className="info-card bg-info text-white text-center">
            <h5>Total Assignments</h5>
            <h3>({filteredTasks.length})</h3>
          </div>

          <div className="table-container">
            {filteredTasks.length > 0 ? (
              <table
                className="table table-striped table-bordered"
                style={{ minWidth: "800px" }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th>Student</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Description</th>
                    <th>Feedback</th>
                    <th>Status</th>
                    <th>Submitted Date</th>
                    <th>Batch</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((a) => {
                    const date = a.submittedAt ? new Date(a.submittedAt) : null;
                    return (
                      <tr key={a._id}>
                        <td>{a.userId?.name}</td>
                        <td>{a.assignmentId?.title}</td>
                        <td>{a.assignmentId?.subject}</td>
                        <td>{a.description}</td>
                        <td>{a.feedback}</td>
                        <td>{a.status}</td>
                        <td>
                          {date
                            ? `${date.toLocaleDateString()} (${date.toLocaleDateString(
                                "en-US",
                                { weekday: "long" }
                              )})`
                            : "-"}
                        </td>
                        <td>{a.batchId?.batchName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No assignments found for selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignment;
