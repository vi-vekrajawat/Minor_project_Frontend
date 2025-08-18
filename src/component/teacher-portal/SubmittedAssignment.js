

import axios from "axios";
import { useEffect, useState } from "react";
import Backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";

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
      console.log("All Submissions:", response.data.allass);

      // Filter only submissions from teacher's batch
      const teacherAssignments = response.data.allass.filter(
        (assignment) => assignment?.assignmentId?.batchId === user.batch
      );

      setTask(teacherAssignments);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Date and Batch Filtering Logic
  const getFilteredAssignments = () => {
    return task.filter((a) => {
      if (!a.submittedAt) return false;
      const date = new Date(a.submittedAt);
      const day = date.toLocaleDateString("en-US", { weekday: "long" }); // Sunday, Monday etc.
      const month = date.toLocaleDateString("en-US", { month: "long" }); // January, February etc.

      // Day filter
      if (filterDay !== "all" && day !== filterDay) return false;
      // Month filter
      if (filterMonth !== "all" && month !== filterMonth) return false;
      // Batch filter
      if (filterBatch !== "all" && a.batchId?.batchName !== filterBatch)
        return false;

      return true;
    });
  };

  const filteredTasks = getFilteredAssignments();

  // 🔹 Extract unique batch names for batch filter dropdown
  const batchOptions = [...new Set(task.map((a) => a.batchId?.batchName))];

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

          {/* Filters */}
          <div className="d-flex flex-wrap mb-3">
            {/* Day Filter */}
            <div className="mr-3">
              <label className="font-weight-bold">Day:</label>
              <select
                className="form-control"
                value={filterDay}
                onChange={(e) => setFilterDay(e.target.value)}
              >
                <option value="all">All</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>

            {/* Month Filter */}
            <div className="mr-3">
              <label className="font-weight-bold">Month:</label>
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

            {/* Batch Filter */}
            <div>
              <label className="font-weight-bold">Batch:</label>
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

          {/* Total Assignment Card */}
          <div
            className="bg-info text-white p-3 mb-4 rounded"
            style={{ maxWidth: "300px", boxShadow: "0px 0px 3px grey" }}
          >
            <h5>Total Assignments</h5>
            <h3 className="text-center">({filteredTasks.length})</h3>
          </div>

          {/* Table of Submissions */}
          {filteredTasks.length > 0 ? (
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
                  {filteredTasks.map((a) => {
                    const date = a.submittedAt
                      ? new Date(a.submittedAt)
                      : null;
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
            </div>
          ) : (
            <p>No assignments found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubmittedAssignment;




// import axios from "axios";
// import { useEffect, useState } from "react";
// import Backend, { BASE_URL } from "../../apis/Backend";
// import { Link } from "react-router-dom";
// import { getCurrentUser } from "../auth/Auth";

// function SubmittedAssignment() {
//   const [task, setTask] = useState([]);
//   const [batchList, setBatchList] = useState([]);
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const user = getCurrentUser();

//   useEffect(() => {
//     loadSubmitAssignment();
//     loadBatchList();
//   }, []);

//   const loadSubmitAssignment = async (batchId = "") => {
//     try {
//       const response = await axios.get(Backend.SUBMISSION);

//       // Filter by selected batch if provided
//       let filteredAssignments = response.data.allass;
//       if (batchId) {
//         filteredAssignments = filteredAssignments.filter(
//           (assignment) => assignment?.assignmentId?.batchId === batchId
//         );
//       }

//       setTask(filteredAssignments);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const loadBatchList = async () => {
//     try {
//       const response = await axios.get(Backend.BATCH_LIST); // backend should provide batch list
//       setBatchList(response.data.batches || []);
//       if (response.data.batches?.length > 0) {
//         setSelectedBatch(response.data.batches[0]._id);
//         loadSubmitAssignment(response.data.batches[0]._id);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleBatchChange = (e) => {
//     const batchId = e.target.value;
//     setSelectedBatch(batchId);
//     loadSubmitAssignment(batchId);
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         overflowX: "hidden",
//         backgroundColor: "#f8f9fa",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "#007bff",
//           color: "white",
//           padding: "15px 20px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
//           <div style={{ fontWeight: "bold", marginRight: "15px" }}>ITEP</div>
//           <Link to="/teacher-portal" style={linkStyleHeader}>
//             Dashboard
//           </Link>
//           <Link to="/create-assignment" style={linkStyleHeader}>
//             Create Assignment
//           </Link>
//           <Link to="/teacher-profile" style={linkStyleHeader}>
//             Profile
//           </Link>
//           <Link to="/submitted" style={linkStyleHeader}>
//             Submitted Assignment
//           </Link>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
//           <img
//             src={`${BASE_URL}/uploads/profile/${user.profile}`}
//             alt="Profile"
//             style={{
//               height: "40px",
//               width: "40px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               marginRight: "10px",
//             }}
//           />
//           <span>{user.name}</span>
//         </div>
//       </div>

//       {/* Sidebar + Main */}
//       <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
//         {/* Sidebar */}
//         <div
//           style={{
//             width: "200px",
//             backgroundColor: "white",
//             boxShadow: "0px 0px 3px grey",
//             paddingTop: "40px",
//           }}
//         >
//           <Link to="/teacher-portal" style={linkStyleSidebar}>
//             Dashboard
//           </Link>
//           <Link to="/create-assignment" style={linkStyleSidebar}>
//             Create Assignment
//           </Link>
//           <Link to="/teacher-profile" style={linkStyleSidebar}>
//             Profile
//           </Link>
//           <Link to="/submitted" style={linkStyleSidebar}>
//             Submitted Assignment
//           </Link>
//         </div>

//         {/* Main Content */}
//         <div style={{ flexGrow: 1, padding: "20px" }}>
//           <h2>Submitted Assignments</h2>
//           <p>View all student submissions</p>

//           {/* Batch Filter */}
//           <div style={{ marginBottom: "20px" }}>
//             <label>
//               <b>Select Batch: </b>
//             </label>
//             <select
//               value={selectedBatch}
//               onChange={handleBatchChange}
//               style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px" }}
//             >
//               {batchList.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.batchName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Total Assignments Card */}
//           <div
//             style={{
//               backgroundColor: "#17a2b8",
//               color: "white",
//               padding: "15px",
//               borderRadius: "5px",
//               maxWidth: "300px",
//               marginBottom: "20px",
//               boxShadow: "0 0 5px grey",
//             }}
//           >
//             <h5>Total Assignments</h5>
//             <h3 style={{ textAlign: "center" }}>({task.length})</h3>
//           </div>

//           {/* Table */}
//           {task.length > 0 ? (
//             <div style={{ overflowX: "auto" }}>
//               <table
//                 style={{
//                   minWidth: "800px",
//                   width: "100%",
//                   borderCollapse: "collapse",
//                 }}
//               >
//                 <thead style={{ backgroundColor: "#343a40", color: "white" }}>
//                   <tr>
//                     <th style={thStyle}>Student</th>
//                     <th style={thStyle}>Title</th>
//                     <th style={thStyle}>Subject</th>
//                     <th style={thStyle}>Description</th>
//                     <th style={thStyle}>Feedback</th>
//                     <th style={thStyle}>Status</th>
//                     <th style={thStyle}>Submitted Date</th>
//                     <th style={thStyle}>Batch</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {task.map((a) => (
//                     <tr key={a._id} style={{ textAlign: "center" }}>
//                       <td>{a.userId?.name}</td>
//                       <td>{a.assignmentId?.title}</td>
//                       <td>{a.assignmentId?.subject}</td>
//                       <td>{a.description}</td>
//                       <td>{a.feedback}</td>
//                       <td>{a.status}</td>
//                       <td>
//                         {a.submittedAt
//                           ? new Date(a.submittedAt).toLocaleDateString()
//                           : "-"}
//                       </td>
//                       <td>{a.assignmentId?.batchName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No assignments found for this batch.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// const linkStyleHeader = {
//   color: "white",
//   marginRight: "15px",
//   textDecoration: "none",
// };

// const linkStyleSidebar = {
//   display: "block",
//   padding: "10px",
//   color: "#333",
//   textDecoration: "none",
//   borderBottom: "1px solid #ccc",
// };

// const thStyle = {
//   padding: "8px",
//   border: "1px solid #dee2e6",
// };

// export default SubmittedAssignment;
