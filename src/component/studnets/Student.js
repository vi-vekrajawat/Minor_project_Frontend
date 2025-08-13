
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backend, { BASE_URL } from "../../apis/Backend";
import { AssignmentContext } from "../../context/AssignmentProvider";

function Student() {
  const user = JSON.parse(sessionStorage.getItem("current-user"));
  const { task = [], refreshTasks } = useContext(AssignmentContext); 

  const normalize = (id) => {
    if (id == null) return "";
    if (typeof id === "object") return String(id._id || id).trim();
    return String(id).trim();
  };

  const userBatchId = normalize(user.batch || user.batchId);

  const filteredTask = (task || []).filter(
    (t) => normalize(t?.batchId) === userBatchId
  );
  
  console.log("User batch:", userBatchId);
  console.log("All tasks:", task?.map(t => ({ id: t._id, title: t.title, batchId: t.batchId })));
  console.log("Filtered tasks for user:", filteredTask?.map(t => ({ id: t._id, title: t.title, batchId: t.batchId })));

  const [submissions, setSubmissions] = useState([]); 
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${Backend.SUBMIT_ASSIGNMENT_BYID}/${user._id}`);
      console.log("Fetched submissions:", response.data); 
      setSubmissions(response.data.submissions || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [user._id]);

  const refreshData = () => {
    fetchSubmissions();
    if (refreshTasks) refreshTasks(); 
  };

  const submissionMap = {};
  (submissions || []).forEach((s) => {
    const aid = s.assignmentId && typeof s.assignmentId === 'object' 
      ? normalize(s.assignmentId._id) 
      : normalize(s.assignmentId);
    const uid = normalize(s.userId);
    
    console.log(`Processing submission: aid=${aid}, uid=${uid}, userMatch=${uid === normalize(user._id)}, status=${s.status}`);
    
    if (uid === normalize(user._id) && aid) {
      submissionMap[aid] = s;
      console.log(`Added to submission map: ${aid} -> status: ${s.status}`);
    }
  });

  console.log("Final submission map:", Object.keys(submissionMap));

  console.log("Submission map:", submissionMap); 

  const completedAssignments = [];
  const submittedPendingAssignments = [];
  const notSubmittedAssignments = [];

  (filteredTask || []).forEach((a) => {
    const aid = normalize(a._id);
    const s = submissionMap[aid];
    
    if (s) {
      const status = String(s.status || "").toLowerCase().trim();
      console.log(`Assignment ${a.title}: status = "${status}"`); 
      
      if (status === "complete") {
        completedAssignments.push({ ...a, submission: s });
      } else {
        submittedPendingAssignments.push({ ...a, submission: s });
      }
    } else {
      notSubmittedAssignments.push(a);
    }
  });

  // Stats
  const totalAssignments = filteredTask.length;
  const submittedCount = completedAssignments.length;
  const pendingCount = submittedPendingAssignments.length;
  const notSubmittedCount = notSubmittedAssignments.length;

  console.log("Stats:", { totalAssignments, submittedCount, pendingCount, notSubmittedCount }); 

  let displayList = [];
  if (filter === "all") {
    displayList = filteredTask.map((a) => ({ 
      ...a, 
      submission: submissionMap[normalize(a._id)] || null 
    }));
  } else if (filter === "complete") {
    displayList = completedAssignments;
  } else if (filter === "pending") {
    displayList = [...submittedPendingAssignments, ...notSubmittedAssignments];
  }

  const RefreshButton = () => (
    <button 
      className="btn btn-sm btn-outline-secondary" 
      onClick={refreshData}
      title="Refresh data"
    >
      🔄 Refresh
    </button>
  );

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden", backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/student-dashboard" className="text-white mr-3" style={{ textDecoration: "none" }}>
            Dashboard
          </Link>
          <Link to="/submission" className="text-white mr-3" style={{ textDecoration: "none" }}>
            My Assignment
          </Link>
          <Link to="/student-profile" className="text-white" style={{ textDecoration: "none" }}>
            Profile
          </Link>
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

      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        <div
          className="text-center bg-white"
          style={{ width: "200px", boxShadow: "0px 0px 3px grey", flexShrink: 0 }}
        >
          <div className="mt-5">
            <Link to="/student-dashboard" className="list-group-item list-group-item-action mt-3">
              Dashboard
            </Link>
            <Link to="/submission" className="list-group-item list-group-item-action mt-3">
              My Assignment
            </Link>
            <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">
              Profile
            </Link>
          </div>
        </div>

        <div className="flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h2>Student Dashboard</h2>
              <p>Manage your classes and assignments</p>
            </div>
            <RefreshButton />
          </div>

          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-primary text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Total Assignment</span>
                <br />
                <h4>{totalAssignments}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-success text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Completed</span>
                <br />
                <h4>{submittedCount}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div
                className="text-center text-white p-3 rounded"
                style={{ boxShadow: "0px 0px 3px grey", background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}
              >
                <span>Submitted (Pending)</span>
                <br />
                <h4>{pendingCount}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div
                className="text-center text-white p-3 rounded"
                style={{ boxShadow: "0px 0px 3px grey", backgroundColor: "orange" }}
              >
                <span>Not Submitted</span>
                <br />
                <h4>{notSubmittedCount}</h4>
              </div>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3 flex-wrap">
            <button 
              className={`btn btn-sm ${filter === "all" ? "btn-dark" : "btn-dark"}`} 
              onClick={() => setFilter("all")}
            >
              All ({totalAssignments})
            </button>
            <button 
              className={`btn btn-sm ${filter === "complete" ? "btn-success" : "btn-success"}`} 
              onClick={() => setFilter("complete")}
            >
              Completed ({submittedCount})
            </button>
            <button 
              className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-warning"}`} 
              onClick={() => setFilter("pending")}
            >
              Pending ({pendingCount + notSubmittedCount})
            </button>
          </div>

          <div
            className="mt-3 p-3 bg-white rounded"
            style={{ boxShadow: "0px 0px 3px grey", maxHeight: "350px", overflowY: "auto" }}
          >
            <h6 className="border-bottom pb-2">Assignments ({displayList.length})</h6>

            {displayList.length > 0 ? (
              displayList.map((data, index) => {
                const submission = data.submission || null;
                const status = submission ? String(submission.status || "").toLowerCase().trim() : "not_submitted";

                let badgeClass, statusText;
                if (status === "complete") {
                  badgeClass = "badge-success";
                  statusText = "✅ Completed";
                } else if (status === "pending") {
                  badgeClass = "badge-warning";
                  statusText = "⏳ Submitted (Pending Review)";
                } else {
                  badgeClass = "badge-secondary";
                  statusText = "Not Submitted";
                }

                return (
                  <div key={index} className="mt-3 p-2 border rounded">
                    <div className="d-flex justify-content-between align-items-start">
                      <small><b>Title:</b> {data.title}</small>
                      <span className={`badge ${badgeClass}`} style={{ padding: "0.35rem 0.6rem" }}>
                        {statusText}
                      </span>
                    </div>

                    <br />
                    <small><b>Description:</b> {data.description}</small>
                    <br />
                    <small><b>Instruction:</b> {data.instructions}</small>
                    <br />
                    <small><b>Subject:</b> {data.subject}</small>
                    <br />
                    <small><b>Deadline:</b> {data.deadline?.slice(0, 10)}</small>
                    <br />

                    {submission && (
                      <>
                        <small><b>Submitted At:</b> {new Date(submission.submittedAt).toLocaleString()}</small>
                        <br />
                        {submission.description && (
                          <>
                            <small><b>Your Description:</b> {submission.description}</small>
                            <br />
                          </>
                        )}
                        {submission.feedback && (
                          <>
                            <small><b>Feedback:</b> {submission.feedback}</small>
                            <br />
                          </>
                        )}
                      </>
                    )}

                    {data?.file && (
                      <small>
                        <b>Assignment File:</b>{" "}
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
                      {status === "not_submitted" && (
                        <Link to="/submission" className="btn btn-success btn-sm mr-2">Submit</Link>
                      )}
                      {status === "pending" && (
                        <button className="btn btn-info btn-sm mr-2" disabled>Awaiting Review</button>
                      )}
                      {status === "complete" && (
                        <button className="btn btn-success btn-sm mr-2" disabled>Completed</button>
                      )}
                      <Link className="btn btn-primary btn-sm">View Details</Link>
                    </div>
                  </div>
                );
              })
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