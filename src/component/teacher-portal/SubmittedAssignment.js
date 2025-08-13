
import axios from "axios";
import { useEffect, useState } from "react";
import Backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

function SubmittedAssignment() {
  const [task, setTask] = useState([]);
  const user = getCurrentUser();

  useEffect(() => {
    loadSubmitAssignment();
  }, []);

  const loadSubmitAssignment = async () => {
    try {
      const response = await axios.get(Backend.SUBMISSION);
      console.log("All Submissions:", response.data.allass);

      // Filter only submissions from teacher's batch
      const teacherAssignments = response.data.allass.filter(
        (assignment) => assignment?.assignmentId?.batchId === user.batch
      );

      setTask(teacherAssignments);
      console.log("Filtered Teacher Assignments:", teacherAssignments);
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link
            to="/teacher-portal"
            className="text-white mr-3"
            style={{ textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <Link
            to="/create-assignment"
            className="text-white mr-3"
            style={{ textDecoration: "none" }}
          >
            Create Assignment
          </Link>
          <Link
            to="/teacher-profile"
            className="text-white mr-3"
            style={{ textDecoration: "none" }}
          >
            Profile
          </Link>
          <Link
            to="/submitted"
            className="text-white"
            style={{ textDecoration: "none" }}
          >
            Submitted Assignment
          </Link>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="ml-2">{user.name}</span>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div
        className="d-flex flex-column flex-md-row"
        style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}
      >
        {/* Sidebar */}
        <div
          className="text-center bg-white"
          style={{
            width: "200px",
            boxShadow: "0px 0px 3px grey",
            flexShrink: 0,
          }}
        >
          <div className="mt-5">
            <Link
              to="/teacher-portal"
              className="list-group-item list-group-item-action mt-3"
            >
              Dashboard
            </Link>
            <Link
              to="/create-assignment"
              className="list-group-item list-group-item-action mt-3"
            >
              Create Assignment
            </Link>
            <Link
              to="/teacher-profile"
              className="list-group-item list-group-item-action mt-3"
            >
              Profile
            </Link>
            <Link
              to="/submitted"
              className="list-group-item list-group-item-action mt-3"
            >
              Submitted Assignment
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2>Submitted Assignments</h2>
          <p>View all student submissions</p>

          {/* Total Assignment Card */}
          <div
            className="bg-info text-white p-3 mb-4 rounded"
            style={{ maxWidth: "300px", boxShadow: "0px 0px 3px grey" }}
          >
            <h5>Total Assignments</h5>
            <h3 className="text-center">({task.length})</h3>
          </div>

          {/* Table of Submissions */}
          {task.length > 0 ? (
            <div style={{ overflowX: "auto" }}>
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
                  {task.map((a) => (
                    <tr key={a._id}>
                      <td>{a.userId?.name}</td>
                      <td>{a.assignmentId?.title}</td>
                      <td>{a.assignmentId?.subject}</td>
                      <td>{a.description}</td>
                      <td>{a.feedback}</td>
                      <td>{a.status}</td>
                      <td>
                        {a.submittedAt
                          ? new Date(a.submittedAt).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>{a.batchId?.batchName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No assignments found for your batch.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignment;
