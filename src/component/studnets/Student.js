// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Backend, { BASE_URL } from "../../apis/Backend";
// import { AssignmentContext } from "../../context/AssignmentProvider";

// function Student() {
//   const user = JSON.parse(sessionStorage.getItem("current-user")) || {};
//   const { task = [] } = useContext(AssignmentContext);

//   const [submissions, setSubmissions] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   const normalize = (id) => {
//     if (!id) return "";
//     if (typeof id === "object") return String(id._id || "").trim();
//     return String(id).trim();
//   };

//   const userBatchId = user?.batch ? normalize(user.batch) : null;

//   const filteredTask = task.filter(
//     (t) => t?.batchId && normalize(t.batchId) === userBatchId
//   );

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       if (!user?._id) return;
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `${Backend.SUBMIT_ASSIGNMENT_BYID}/${user._id}`
//         );
//         setSubmissions(response.data.submissions || []);
//       } catch (err) {
//         console.error("Error fetching submissions:", err);
//         setSubmissions([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSubmissions();
//   }, [user._id]);

//   const submissionMap = {};
//   submissions.forEach((s) => {
//     const aid =
//       s?.assignmentId && typeof s.assignmentId === "object"
//         ? normalize(s.assignmentId._id)
//         : normalize(s.assignmentId);
//     const uid = normalize(s?.userId);
//     if (uid === normalize(user?._id) && aid) submissionMap[aid] = s;
//   });

//   const completedAssignments = [];
//   const submittedPendingAssignments = [];
//   const notSubmittedAssignments = [];

//   filteredTask.forEach((a) => {
//     const aid = normalize(a?._id);
//     const s = submissionMap[aid];
//     if (s) {
//       const status = String(s.status || "").toLowerCase();
//       if (status === "complete") completedAssignments.push({ ...a, submission: s });
//       else submittedPendingAssignments.push({ ...a, submission: s });
//     } else {
//       notSubmittedAssignments.push(a);
//     }
//   });

//   const totalAssignments = filteredTask.length;
//   const submittedCount = completedAssignments.length;
//   const pendingCount = submittedPendingAssignments.length;
//   const notSubmittedCount = notSubmittedAssignments.length;

//   let displayList = [];
//   if (filter === "all")
//     displayList = filteredTask.map((a) => ({
//       ...a,
//       submission: submissionMap[normalize(a?._id)] || null,
//     }));
//   else if (filter === "complete") displayList = completedAssignments;
//   else if (filter === "pending")
//     displayList = [...submittedPendingAssignments, ...notSubmittedAssignments];

//   displayList = displayList.sort((a, b) => {
//     const dateA = a?.deadline ? new Date(a.deadline) : new Date(0);
//     const dateB = b?.deadline ? new Date(b.deadline) : new Date(0);
//     return dateB - dateA;
//   });

//   if (loading) return <div className="text-center mt-5">Loading...</div>;

//   return (
//     <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
//       <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
//         <div className="d-flex flex-wrap">
//           <div className="mr-3 font-weight-bold">ITEP</div>
//           <Link className="text-white mr-3" style={{ textDecoration: "none" }}>Dashboard</Link>
//           <Link to="/submission" className="text-white mr-3" style={{ textDecoration: "none" }}>My Assignment</Link>
//           <Link to="/student-profile" className="text-white" style={{ textDecoration: "none" }}>Profile</Link>
//         </div>
//         <div className="d-flex mt-2 mt-md-0">
//           {user?.profile && (
//             <img
//               src={`${BASE_URL}/uploads/profile/${user.profile}`}
//               alt="Profile"
//               style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
//             />
//           )}
//           <span className="ml-2">{user?.name || "Student"}</span>
//         </div>
//       </div>

//       <div className="d-flex flex-column flex-md-row">
//         <div className="text-center bg-white" style={{ width: "200px", boxShadow: "0px 0px 3px grey", flexShrink: 0 }}>
//           <div className="mt-5">
//             <Link className="list-group-item list-group-item-action mt-3">Dashboard</Link>
//             <Link to="/submission" className="list-group-item list-group-item-action mt-3">My Assignment</Link>
//             <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
//           </div>
//         </div>

//         <div className="flex-grow-1 p-4">
//           <div className="row mb-3">
//             <div className="col-6 col-md-3 mb-3">
//               <div className="text-center bg-primary text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
//                 <span>Total Assignment</span><br /><h4>{totalAssignments}</h4>
//               </div>
//             </div>
//             <div className="col-6 col-md-3 mb-3">
//               <div className="text-center bg-success text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
//                 <span>Completed</span><br /><h4>{submittedCount}</h4>
//               </div>
//             </div>
//             <div className="col-6 col-md-3 mb-3">
//               <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
//                 <span>Submitted Pending</span><br /><h4>{pendingCount}</h4>
//               </div>
//             </div>
//             <div className="col-6 col-md-3 mb-3">
//               <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", backgroundColor: "orange" }}>
//                 <span>Not Submitted</span><br /><h4>{notSubmittedCount}</h4>
//               </div>
//             </div>
//           </div>

//           <div className="d-flex gap-2 mb-3 flex-wrap">
//             <button className={`btn btn-sm ${filter === "all" ? "btn-dark" : "btn-dark"}`} onClick={() => setFilter("all")}>All ({totalAssignments})</button>
//             <button className={`btn btn-sm ${filter === "complete" ? "btn-success" : "btn-success"}`} onClick={() => setFilter("complete")}>Completed ({submittedCount})</button>
//             <button className={`btn btn-sm ${filter === "pending" ? "btn-warning" : "btn-warning"}`} onClick={() => setFilter("pending")}>Pending ({pendingCount + notSubmittedCount})</button>
//           </div>

//           <div className="mt-3 p-3 bg-white rounded" style={{ boxShadow: "0px 0px 3px grey", maxHeight: "350px", overflowY: "auto" }}>
//             <h6 className="border-bottom pb-2">Assignments ({displayList.length})</h6>
//             {displayList.length > 0 ? displayList.map((data, index) => {
//               const submission = data.submission || null;
//               const status = submission ? String(submission.status || "").toLowerCase() : "not_submitted";
//               let badgeClass, statusText;
//               if (status === "complete") { badgeClass = "badge-success"; statusText = "✅ Completed"; }
//               else if (status === "pending") { badgeClass = "badge-warning"; statusText = "⏳ Submitted (Pending)"; }
//               else { badgeClass = "badge-secondary"; statusText = "Not Submitted"; }

//               return (
//                 <div key={index} className="mt-3 p-2 border rounded">
//                   <div className="d-flex justify-content-between align-items-start">
//                     <small><b>Title:</b> {data.title}</small>
//                     <span className={`badge ${badgeClass}`} style={{ padding: "0.35rem 0.6rem" }}>{statusText}</span>
//                   </div>
//                   <br />
//                   <small><b>Description:</b> {data.description}</small><br/>
//                   <small><b>Instruction:</b> {data.instructions}</small><br/>
//                   <small><b>Subject:</b> {data.subject}</small><br/>
//                   <small><b>Deadline:</b> {data.deadline?.slice(0,10)}</small><br/>
//                   {submission && (
//                     <>
//                       <small><b>Submitted At:</b> {new Date(submission.submittedAt).toLocaleString()}</small><br/>
//                       {submission.description && <small><b>Your Description:</b> {submission.description}</small>}
//                       <br/>
//                       {submission.feedback && <small><b>Feedback:</b> {submission.feedback}</small>}
//                     </>
//                   )}
//                 </div>
//               );
//             }) : <p className="text-center text-muted mt-3">No assignments found.</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Student;


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backend, { BASE_URL } from "../../apis/Backend";
import { AssignmentContext } from "../../context/AssignmentProvider";
import "./Student.css";   // custom css import

function Student() {
  const user = JSON.parse(sessionStorage.getItem("current-user")) || {};
  const { task = [] } = useContext(AssignmentContext);

  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const normalize = (id) => {
    if (!id) return "";
    if (typeof id === "object") return String(id._id || "").trim();
    return String(id).trim();
  };

  const userBatchId = user?.batch ? normalize(user.batch) : null;

  const filteredTask = task.filter(
    (t) => t?.batchId && normalize(t.batchId) === userBatchId
  );

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!user?._id) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `${Backend.SUBMIT_ASSIGNMENT_BYID}/${user._id}`
        );
        setSubmissions(response.data.submissions || []);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [user._id]);

  const submissionMap = {};
  submissions.forEach((s) => {
    const aid =
      s?.assignmentId && typeof s.assignmentId === "object"
        ? normalize(s.assignmentId._id)
        : normalize(s.assignmentId);
    const uid = normalize(s?.userId);
    if (uid === normalize(user?._id) && aid) submissionMap[aid] = s;
  });

  const completedAssignments = [];
  const submittedPendingAssignments = [];
  const notSubmittedAssignments = [];

  filteredTask.forEach((a) => {
    const aid = normalize(a?._id);
    const s = submissionMap[aid];
    if (s) {
      const status = String(s.status || "").toLowerCase();
      if (status === "complete") completedAssignments.push({ ...a, submission: s });
      else submittedPendingAssignments.push({ ...a, submission: s });
    } else {
      notSubmittedAssignments.push(a);
    }
  });

  const totalAssignments = filteredTask.length;
  const submittedCount = completedAssignments.length;
  const pendingCount = submittedPendingAssignments.length;
  const notSubmittedCount = notSubmittedAssignments.length;

  let displayList = [];
  if (filter === "all")
    displayList = filteredTask.map((a) => ({
      ...a,
      submission: submissionMap[normalize(a?._id)] || null,
    }));
  else if (filter === "complete") displayList = completedAssignments;
  else if (filter === "pending")
    displayList = [...submittedPendingAssignments, ...notSubmittedAssignments];

  displayList = displayList.sort((a, b) => {
    const dateA = a?.deadline ? new Date(a.deadline) : new Date(0);
    const dateB = b?.deadline ? new Date(b.deadline) : new Date(0);
    return dateB - dateA;
  });

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="student-container">
      {/* Header */}
      <div className="student-header d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="brand mr-3">ITEP</div>
          <Link className="nav-link">Dashboard</Link>
          <Link to="/submission" className="nav-link">My Assignment</Link>
          <Link to="/student-profile" className="nav-link">Profile</Link>
        </div>
        <div className="d-flex mt-2 mt-md-0 align-items-center">
          {user?.profile && (
            <img
              src={`${BASE_URL}/uploads/profile/${user.profile}`}
              alt="Profile"
              className="profile-img"
              style={{height:"40px"}}
            />
          )}
          <span className="ml-2">{user?.name || "Student"}</span>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="d-flex flex-column flex-md-row">
        <div className="student-sidebar text-center">
          <div className="mt-5">
            <Link className="list-group-item list-group-item-action mt-3">Dashboard</Link>
            <Link to="/submission" className="list-group-item list-group-item-action mt-3">My Assignment</Link>
            <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
          </div>
        </div>

        <div className="flex-grow-1 p-4">
          {/* Stats Cards */}
          <div className="row mb-3">
            <div className="col-6 col-md-3 mb-3">
              <div className="stat-card bg-primary text-white">
                <span>Total Assignment</span><br /><h4>{totalAssignments}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="stat-card bg-success text-white">
                <span>Completed</span><br /><h4>{submittedCount}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="stat-card text-white gradient-pink">
                <span>Submitted Pending</span><br /><h4>{pendingCount}</h4>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="stat-card text-white bg-warning">
                <span>Not Submitted</span><br /><h4>{notSubmittedCount}</h4>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="d-flex gap-2 mb-3 flex-wrap">
            <button className={`btn btn-sm btn-dark`} onClick={() => setFilter("all")}>All ({totalAssignments})</button>
            <button className={`btn btn-sm btn-success`} onClick={() => setFilter("complete")}>Completed ({submittedCount})</button>
            <button className={`btn btn-sm btn-warning`} onClick={() => setFilter("pending")}>Pending ({pendingCount + notSubmittedCount})</button>
          </div>

          {/* Assignments List */}
          <div className="assignment-list">
            <h6 className="border-bottom pb-2">Assignments ({displayList.length})</h6>
            {displayList.length > 0 ? displayList.map((data, index) => {
              const submission = data.submission || null;
              const status = submission ? String(submission.status || "").toLowerCase() : "not_submitted";
              let badgeClass, statusText;
              if (status === "complete") { badgeClass = "badge-success"; statusText = "✅ Completed"; }
              else if (status === "pending") { badgeClass = "badge-warning"; statusText = "⏳ Submitted (Pending)"; }
              else { badgeClass = "badge-secondary"; statusText = "Not Submitted"; }

              return (
                <div key={index} className="assignment-card">
                  <div className="d-flex justify-content-between align-items-start">
                    <small><b>Title:</b> {data.title}</small>
                    <span className={`badge ${badgeClass}`}>{statusText}</span>
                  </div>
                  <br />
                  <small><b>Description:</b> {data.description}</small><br />
                  <small><b>Instruction:</b> {data.instructions}</small><br />
                  <small><b>Subject:</b> {data.subject}</small><br />
                  <small><b>Deadline:</b> {data.deadline?.slice(0, 10)}</small><br />
                  {submission && (
                    <>
                      <small><b>Submitted At:</b> {new Date(submission.submittedAt).toLocaleString()}</small><br />
                      {submission.description && <small><b>Your Description:</b> {submission.description}</small>}<br />
                      {submission.feedback && <small><b>Feedback:</b> {submission.feedback}</small>}
                    </>
                  )}
                </div>
              );
            }) : <p className="text-center text-muted mt-3">No assignments found.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
