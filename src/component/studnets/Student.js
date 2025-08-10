import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backend, { BASE_URL } from "../../apis/Backend";
import { AssignmentContext } from "../../context/AssignmentProvider";

function Student() {
  const user = JSON.parse(sessionStorage.getItem("current-user"));
  const { task } = useContext(AssignmentContext);

  const [submmit, setSubmit] = useState({});
  const [submittedIds, setSubmittedIds] = useState([]);
  const [filter, setFilter] = useState("all"); // all | submitted | pending | overdue

  useEffect(() => {
    const submitassignment = async () => {
      try {
        const response = await axios.get(`${Backend.COUNT_ASSIGNMENT}/${user._id}`);
        const fetchSubmitted = await axios.get(`${Backend.SUBMMITED_ASSIGNMENT}`);

        setSubmit(response.data);

        const submittedResponse = fetchSubmitted.data;

        if (Array.isArray(submittedResponse.allass)) {
          const ids = submittedResponse.allass.map(item => item.assignmentId);
          setSubmittedIds(ids);
        } else {
          setSubmittedIds([]);
        }
      } catch (error) {
        console.error("Error fetching assignment count:", error);
      }
    };

    submitassignment();
  }, []);

  const filteredTasks = task.filter(t => t.batchId === user.batch);

  const visibleTasks = filteredTasks.filter(t => {
    if (filter === "complete") return submittedIds.includes(t._id);
    if (filter === "pending") return !submittedIds.includes(t._id);
    if (filter === "overdue") return new Date(t.deadline) < new Date();
    return true;
  });

  const overdueCount = filteredTasks.filter(a => new Date(a.deadline) < new Date()).length;

  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/student-dashboard" className="text-white mr-3" style={{ textDecoration: "none" }}>Dashboard</Link>
          <Link to="/submission" className="text-white mr-3" style={{ textDecoration: "none" }}>My Assignment</Link>
          <Link to="/student-profile" className="text-white" style={{ textDecoration: "none" }}>Profile</Link>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span className="ml-2">{user.name}</span>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div className="text-center bg-white" style={{ width: "200px", boxShadow: "0px 0px 3px grey", flexShrink: 0 }}>
          <div className="mt-5">
            <Link to="/student-dashboard" className="list-group-item list-group-item-action mt-3">Dashboard</Link>
            <Link to="/submission" className="list-group-item list-group-item-action mt-3">My Assignment</Link>
            <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2>Student Dashboard</h2>
          <p>Manage your classes and assignments</p>

          {/* Summary Cards */}
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-primary text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Total Assignment</span><br />
                <h4>{filteredTasks.length}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-success text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Submitting</span><br />
                <h4>{submmit?.submissionCount ?? 0}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
                <span>Pending</span><br />
                <h4>{filteredTasks.length - (submmit?.submissionCount ?? 0)}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", backgroundColor: "orange" }}>
                <span>Overdue</span><br />
                <h4>{overdueCount}</h4>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <button className={`btn btn-sm ${filter === "all" ? "btn-dark" : "btn-dark"}`} onClick={() => setFilter("all")}>All</button>
            <button className={`btn btn-sm ${filter === "complete" ? "btn-success" : "btn-success"}`} onClick={() => setFilter("complete")}>Submitted</button>
            <button className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-warning"}`} onClick={() => setFilter("pending")}>Pending</button>
            <button className={`btn btn-sm ${filter === "overdue" ? "btn-danger" : "btn-danger"}`} onClick={() => setFilter("overdue")}>Overdue</button>
          </div>

          {/* Assignment List */}
          <div className="mt-3 p-3 bg-white rounded" style={{ boxShadow: "0px 0px 3px grey", maxHeight: "350px", overflowY: "auto" }}>
            <h6 className="border-bottom pb-2">Assignments</h6>
            {visibleTasks.length > 0 ? (
              visibleTasks.map((data, index) => (
                <div key={index} className="mt-3 p-2 border rounded">
                  <small><b>Title:</b> {data.title}</small>
                  <small className="float-right text-warning">Active</small><br />
                  <small><b>Subject:</b> {data.subject}</small><br />
                  <small><b>Deadline:</b> {data.deadline?.slice(0, 10)}</small><br />

                  {data?.file && (
                    <small>
                      <b>File:</b>{" "}
                      <a
                        href={`${BASE_URL}/assignment/files/${data?.file}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "#007bff" }}
                      >
                        <i className="fa fa-download mr-1"></i>Download File
                      </a>
                    </small>
                  )}
                  <div className="mt-2">
                    <Link to="/submission" className="btn btn-success btn-sm mr-2">Submit</Link>
                    <Link className="btn btn-primary btn-sm">View</Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted mt-3">No assignments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
