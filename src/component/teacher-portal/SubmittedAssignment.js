
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Backend, { BASE_URL } from "../../apis/Backend";
// import { Link } from "react-router-dom";
// import { getCurrentUser } from "../auth/Auth";
// import "./SubmittedAssignment.css";

// function SubmittedAssignment() {
//   const [task, setTask] = useState([]);
//   const [filterDay, setFilterDay] = useState("all");
//   const [filterMonth, setFilterMonth] = useState("all");
//   const [filterBatch, setFilterBatch] = useState("all");

//   const user = getCurrentUser();

//   useEffect(() => {
//     loadSubmitAssignment();
//   }, []);

// const loadSubmitAssignment = async () => {
//   try {
//     const response = await axios.get(Backend.SUBMISSION);
//     console.log("API RESPONSE:", response.data);

//     const teacherAssignments = response.data.allass.filter((assignment) => {
//       const teacherId = assignment?.assignmentId?.teacherId;
//       const userId = user?._id;

//       // ✅ Check if teacher is still part of the assignment's batch
//       const batchTeachers = assignment?.batchId?.teachers || [];
//       const isTeacherInBatch = batchTeachers.some(
//         (t) => t.toString().trim() === userId?.toString().trim()
//       );

//       return teacherId?.toString().trim() === userId?.toString().trim() && isTeacherInBatch;
//     });

//     console.log("FILTERED ASSIGNMENTS:", teacherAssignments);
//     setTask(teacherAssignments);
//   } catch (err) {
//     console.log(err);
//   }
// };

//   const getFilteredAssignments = () => {
//     return task.filter((a) => {
//       if (!a.submittedAt) return false;
//       const date = new Date(a.submittedAt);
//       const day = date.toLocaleDateString("en-US", { weekday: "long" });
//       const month = date.toLocaleDateString("en-US", { month: "long" });

//       if (filterDay !== "all" && day !== filterDay) return false;
//       if (filterMonth !== "all" && month !== filterMonth) return false;
//       if (filterBatch !== "all" && a.batchId?.batchName !== filterBatch)
//         return false;

//       return true;
//     });
//   };

//   const filteredTasks = getFilteredAssignments();
//   const batchOptions = [...new Set(task.map((a) => a.batchId?.batchName))];
//   console.log("batch options", batchOptions);
//   console.log("tasks", task);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         overflowX: "hidden",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       {/* Header */}
//       <div className="submitted-header">
//         <div>
//           <span>ITEP</span>
//           <Link
//             to="/teacher-portal"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/create-assignment"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Create Assignment
//           </Link>
//           <Link
//             to="/teacher-profile"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Profile
//           </Link>
//           <Link
//             to="/submitted"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Submitted Assignment
//           </Link>
//         </div>
//         <div>
//           <img
//             src={`${BASE_URL}/uploads/profile/${user.profile}`}
//             alt="Profile"
//           />
//           <span>{user.name}</span>
//         </div>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           width: "100vw",
//           minHeight: "calc(100vh - 60px)",
//         }}
//       >
//         {/* Sidebar */}
//         <div className="submitted-sidebar text-center">
//         <div className="text-center bg-white shadow-sm admin-sidebar">
//           <div className="d-flex flex-column align-items-start">
//             <Link
//               to="/teacher-portal"
//               className="list-group-item list-group-item-action w-100"
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/create-assignment"
//               className="list-group-item list-group-item-action w-100"
//             >
//               Create Assignment
//             </Link>
//             <Link
//              to="/teacher-profile"
//               className="list-group-item list-group-item-action w-100 "
//             >
//               Profile
//             </Link>
//             <Link
             
//               className="list-group-item list-group-item-action w-100 active"
//             >
//               Submitted Assignment
//             </Link>
//           </div>
//         </div>
//         </div>

//         {/* Main Content */}
//         <div style={{ flexGrow: 1, padding: "20px" }}>
//           <h2>Submitted Assignments</h2>
//           <p>View all student submissions</p>

//           {/* Filters */}
//           <div className="filters">
//             <div>
//               <label>Day:</label>
//               <select
//                 className="form-control"
//                 value={filterDay}
//                 onChange={(e) => setFilterDay(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {[
//                   "Sunday",
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label>Month:</label>
//               <select
//                 className="form-control"
//                 value={filterMonth}
//                 onChange={(e) => setFilterMonth(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label>Batch:</label>
//               <select
//                 className="form-control"
//                 value={filterBatch}
//                 onChange={(e) => setFilterBatch(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {batchOptions.map(
//                   (batch, i) =>
//                     batch && (
//                       <option key={i} value={batch}>
//                         {batch}
//                       </option>
//                     )
//                 )}
//               </select>
//             </div>
//           </div>

//           <div className="info-card bg-info text-white text-center">
//             <h5>Total Assignments</h5>
//             <h3>({filteredTasks.length})</h3>
//           </div>

//           <div className="table-container">
//             {filteredTasks.length > 0 ? (
//               <table
//                 className="table table-striped table-bordered"
//                 style={{ minWidth: "800px" }}
//               >
//                 <thead className="thead-dark">
//                   <tr>
//                     <th>Student</th>
//                     <th>Title</th>
//                     <th>Subject</th>
//                     <th>Description</th>
//                     <th>Feedback</th>
//                     <th>Status</th>
//                     <th>Submitted Date</th>
//                     <th>Batch</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredTasks.map((a) => {
//                     const date = a.submittedAt ? new Date(a.submittedAt) : null;
//                     return (
//                       <tr key={a._id}>
//                         <td>{a.userId?.name}</td>
//                         <td>{a.assignmentId?.title}</td>
//                         <td>{a.assignmentId?.subject}</td>
//                         <td>{a.description}</td>
//                         <td>{a.feedback}</td>
//                         <td>{a.status}</td>
//                         <td>
//                           {date
//                             ? `${date.toLocaleDateString()} (${date.toLocaleDateString(
//                                 "en-US",
//                                 { weekday: "long" }
//                               )})`
//                             : "-"}
//                         </td>
//                         <td>{a.batchId?.batchName}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No assignments found for selected filters.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubmittedAssignment;


// import axios from "axios";
// import { useEffect, useState } from "react";
// import Backend, { BASE_URL } from "../../apis/Backend";
// import { Link } from "react-router-dom";
// import { getCurrentUser } from "../auth/Auth";
// import "./SubmittedAssignment.css";

// function SubmittedAssignment() {
//   const [task, setTask] = useState([]);
//   const [filterDay, setFilterDay] = useState("all");
//   const [filterMonth, setFilterMonth] = useState("all");
//   const [filterBatch, setFilterBatch] = useState("all");

//   const user = getCurrentUser();

//   useEffect(() => {
//     loadSubmitAssignment();
//   }, []);

//   const loadSubmitAssignment = async () => {
//     try {
//       const response = await axios.get(Backend.SUBMISSION);

//       // ✅ Filter assignments by teacher
//       const teacherAssignments = response.data.allass.filter((assignment) => {
//         const teacherId = assignment?.assignmentId?.teacherId;
//         const userId = user?._id;

//         const batchTeachers = assignment?.batchId?.teachers || [];
//         const isTeacherInBatch = batchTeachers.some(
//           (t) => t.toString().trim() === userId?.toString().trim()
//         );

//         return (
//           teacherId?.toString().trim() === userId?.toString().trim() &&
//           isTeacherInBatch
//         );
//       });

//       setTask(teacherAssignments);
//     } catch (err) {
//       console.log("Error fetching submissions", err);
//     }
//   };

//   // 🔑 Apply filters + Group submissions by student
//   const getFilteredAssignments = () => {
//     let filtered = task.filter((a) => {
//       if (!a.submittedAt) return false;
//       const date = new Date(a.submittedAt);
//       const day = date.toLocaleDateString("en-US", { weekday: "long" });
//       const month = date.toLocaleDateString("en-US", { month: "long" });

//       if (filterDay !== "all" && day !== filterDay) return false;
//       if (filterMonth !== "all" && month !== filterMonth) return false;
//       if (filterBatch !== "all" && a.batchId?.batchName !== filterBatch)
//         return false;

//       return true;
//     });

//     // ✅ Group by studentId
//     const grouped = {};
//     filtered.forEach((s) => {
//       const studentId =
//         typeof s.userId === "object" ? s.userId._id : s.userId;
//       if (!grouped[studentId]) {
//         grouped[studentId] = {
//           student: s.userId,
//           batch: s.batchId?.batchName,
//           count: 0,
//           submissions: [],
//           assignments:[]
//         };
//       }
//       grouped[studentId].count += 1;
//       grouped[studentId].submissions.push(s);
//       console.log(s.assignmentId.title)
//       console.log(studentId)
//           grouped[studentId].assignments.push(s.assignmentId.title); // assuming assignmentId has title

//     });

//     return Object.values(grouped);
//   };

//   const groupedTasks = getFilteredAssignments();
//   const batchOptions = [...new Set(task.map((a) => a.batchId?.batchName))];

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         overflowX: "hidden",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       {/* Header */}
//       <div className="submitted-header">
//         <div>
//           <span>ITEP</span>
//           <Link
//             to="/teacher-portal"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Dashboard
//           </Link>
//           <Link
//             to="/create-assignment"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Create Assignment
//           </Link>
//           <Link
//             to="/teacher-profile"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Profile
//           </Link>
//           <Link
//             to="/submitted"
//             className="text-white"
//             style={{ marginLeft: "15px", textDecoration: "none" }}
//           >
//             Submitted Assignment
//           </Link>
//         </div>
//         <div>
//           <img
//             src={`${BASE_URL}/uploads/profile/${user.profile}`}
//             alt="Profile"
//           />
//           <span>{user.name}</span>
//         </div>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           width: "100vw",
//           minHeight: "calc(100vh - 60px)",
//         }}
//       >
//         {/* Sidebar */}
//         <div className="submitted-sidebar text-center">
//           <div className="text-center bg-white shadow-sm admin-sidebar">
//             <div className="d-flex flex-column align-items-start">
//               <Link
//                 to="/teacher-portal"
//                 className="list-group-item list-group-item-action w-100"
//               >
//                 Dashboard
//               </Link>
//               <Link
//                 to="/create-assignment"
//                 className="list-group-item list-group-item-action w-100"
//               >
//                 Create Assignment
//               </Link>
//               <Link
//                 to="/teacher-profile"
//                 className="list-group-item list-group-item-action w-100"
//               >
//                 Profile
//               </Link>
//               <Link className="list-group-item list-group-item-action w-100 active">
//                 Submitted Assignment
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div style={{ flexGrow: 1, padding: "20px" }}>
//           {/* <h2>Submitted Assignments</h2>
//           <p>View all student submissions</p> */}

//           {/* Filters */}
//           <div className="filters">
//             <div>
//               <label>Day:</label>
//               <select
//                 className="form-control"
//                 value={filterDay}
//                 onChange={(e) => setFilterDay(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {[
//                   "Sunday",
//                   "Monday",
//                   "Tuesday",
//                   "Wednesday",
//                   "Thursday",
//                   "Friday",
//                   "Saturday",
//                 ].map((d) => (
//                   <option key={d} value={d}>
//                     {d}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="bg-info">
//               <label className="text-white">Month:</label>
//               <select style={{borderStyle:"none"}}
//                 // className="form-control"
//                 value={filterMonth}
//                 onChange={(e) => setFilterMonth(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((m) => (
//                   <option key={m} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* <div>
//               <label>Batch:</label>
//               <select
//                 className="form-control"
//                 value={filterBatch}
//                 onChange={(e) => setFilterBatch(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 {batchOptions.map(
//                   (batch, i) =>
//                     batch && (
//                       <option key={i} value={batch}>
//                         {batch}
//                       </option>
//                     )
//                 )}
//               </select>
//             </div> */}
//           </div>

//           <div className="info-card bg-info text-white text-center">
//             <h5>Total Students Submitted</h5>
//             <h3>({groupedTasks.length})</h3>
//           </div>

//           {/* Grouped Table */}
//           <div className="table-container">
//             {groupedTasks.length > 0 ? (
//               <table
//                 className="table table-striped table-bordered"
//                 style={{ minWidth: "800px" }}
//               >
//                 <thead className="thead-dark">
//                   <tr>
//                     <th>Student</th>
//                     {/* <th>Batch</th> */}
//                     <th>Total Assignments Submitted</th>
//                     <th>Assignment</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {groupedTasks.map((g) => (
//                     <tr key={g.student._id || g.student}>
//                       <td>{g.student?.name || "Unknown Student"}</td>
//                       {/* <td>{g.batch}</td> */}
//                       <td>{g.count}</td>
//                       <td> <ul style={{listStyle:"none"}}>
//           {g.assignments.map((title, idx) => (
//             <li key={idx}>{title}</li>
//           ))}
//         </ul></td>
//                       {/* <td>{g.title}</td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p>No assignments found for selected filters.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SubmittedAssignment;
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

      const teacherAssignments = response.data.allass.filter((assignment) => {
        const teacherId = assignment?.assignmentId?.teacherId;
        const userId = user?._id;

        const batchTeachers = assignment?.batchId?.teachers || [];
        const isTeacherInBatch = batchTeachers.some(
          (t) => t.toString().trim() === userId?.toString().trim()
        );

        return (
          teacherId?.toString().trim() === userId?.toString().trim() &&
          isTeacherInBatch
        );
      });

      setTask(teacherAssignments);
    } catch (err) {
      console.log("Error fetching submissions", err);
    }
  };

  const getFilteredAssignments = () => {
    let filtered = task.filter((a) => {
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

    const grouped = {};
    filtered.forEach((s) => {
      const studentId = typeof s.userId === "object" ? s.userId._id : s.userId;
      if (!grouped[studentId]) {
        grouped[studentId] = {
          student: s.userId,
          batch: s.batchId?.batchName,
          count: 0,
          submissions: [],
          assignments: [],
        };
      }
      grouped[studentId].count += 1;
      grouped[studentId].submissions.push(s);
      grouped[studentId].assignments.push(s.assignmentId.title);
    });

    return Object.values(grouped);
  };

  const groupedTasks = getFilteredAssignments();
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
      <div className="submitted-header">
        <div>
          <span>ITEP</span>
          <Link to="/teacher-portal" className="text-white ml-3">
            Dashboard
          </Link>
          <Link to="/create-assignment" className="text-white  ml-3">
            Create Assignment
          </Link>
          <Link to="/teacher-profile" className="text-white  ml-3">
            Profile
          </Link>
          <Link to="/submitted" className="text-white  ml-3">
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

      <div style={{ display: "flex", width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        {/* Sidebar */}
        <div className="submitted-sidebar text-center">
          <div className="text-center bg-white shadow-sm admin-sidebar">
            <div className="d-flex flex-column align-items-start">
              <Link to="/teacher-portal" className="list-group-item list-group-item-action w-100">
                Dashboard
              </Link>
              <Link to="/create-assignment" className="list-group-item list-group-item-action w-100">
                Create Assignment
              </Link>
              <Link to="/teacher-profile" className="list-group-item list-group-item-action w-100">
                Profile
              </Link>
              <Link className="list-group-item list-group-item-action w-100 active">
                Submitted Assignment
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          {/* Info + Filters Row */}
          <div className="info-filters-row d-flex flex-wrap align-items-center justify-content-between mb-4">
            {/* Info Card */}
            <div className="info-card bg-info text-white text-center">
              <h5>Total Students Submitted</h5>
              <h3>({groupedTasks.length})</h3>
            </div>

            {/* Filters */}
            <div className="filters d-flex flex-wrap gap-3">
              {/* Day Filter */}
              <div className="filter-card p-2 mr-3 shadow-sm bg-white rounded">
                <label className="filter-label">Day</label>
                <select
                  className="form-select"
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                >
                  <option value="all">All</option>
                  {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div className="filter-card p-2 mr-1 shadow-sm bg-white rounded">
                <label className="filter-label">Month</label>
                <select
                  className="form-select"
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                >
                  <option value="all">All</option>
                  {[
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                  ].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Batch Filter */}
              {/* <div className="filter-card p-2 mr-2 shadow-sm bg-white rounded">
                <label className="filter-label">Batch</label>
                <select
                  className="form-select"
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                >
                  <option value="all">All</option>
                  {batchOptions.map(
                    (batch, i) => batch && (<option key={i} value={batch}>{batch}</option>)
                  )}
                </select>
              </div> */}
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            {groupedTasks.length > 0 ? (
              <table className="table table-striped table-bordered" style={{ minWidth: "800px" }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Student</th>
                    <th>Total Assignments Submitted</th>
                    <th>Assignments</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedTasks.map((g) => (
                    <tr key={g.student._id || g.student}>
                      <td>{g.student?.name || "Unknown Student"}</td>
                      <td>{g.count}</td>
                      <td>
                        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                          {g.assignments.map((title, idx) => (<li key={idx}>{title}</li>))}
                        </ul>
                      </td>
                    </tr>
                  ))}
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
