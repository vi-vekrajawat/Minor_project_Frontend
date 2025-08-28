import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { BatchContext } from "../../context/BatchProvider";
import { getCurrentUser } from "../auth/Auth";
import Backend from "../../apis/Backend";
import "./Admin.css";   // ✅ New CSS import

function Admin() {
  const [users, setUsers] = useState([]);
  const [studentBatchFilter, setStudentBatchFilter] = useState("");

  const [activeTab, setActiveTab] = useState("students");
  const { batchState } = useContext(BatchContext);
  const [openFormFor, setOpenFormFor] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(backend.STUDENT_LIST);
      setUsers(res.data.allStudents || []);
    } catch (e) {
      console.error("Failed to load users", e);
      alert("Failed to load users");
    }
  };

  const students = useMemo(
    () => users.filter((u) => u.role === "student"),
    [users]
  );
  const teachers = useMemo(
    () => users.filter((u) => u.role === "teacher"),
    [users]
  );

  const getBatchNames = (u) => {
    let names = [];

    if (Array.isArray(u.batches) && u.batches.length > 0) {
      names = [
        ...names,
        ...u.batches.map((b) =>
          typeof b === "string"
            ? batchState.find((x) => x._id === b)?.batchName
            : b?.batchName
        ),
      ];
    }

    if (u.batch) {
      const singleBatch =
        typeof u.batch === "string"
          ? batchState.find((x) => x._id === u.batch)?.batchName
          : u.batch?.batchName;
      if (singleBatch) names.push(singleBatch);
    }

    return [...new Set(names.filter(Boolean))];
  };

  const deleteTeacher = async (teacherId) => {
    try {
      await axios.delete(`${backend.DELETE_TEACHER}/${teacherId}`);
      alert("Teacher deleted ✅");
      loadUsers();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || "Error deleting teacher ");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${Backend.DELETE_STUDENT}/${id}`);
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

   const assignBatchToTeacher = async (teacherId, batchId) => {
  try {
    const res = await axios.put(
      `${Backend.ASSIGN_BATCH}${teacherId}`,
      { batchId }
    );
    console.log(res)

    alert("Batch assigned successfully ✅");
       setOpenFormFor(null);
    setSelectedBatch("");
    loadUsers();
  } catch (err) {
    console.error(err);
    alert("Failed to assign batch ❌");
  }
};

  return (
    <div className="admin-container">
      <div className="admin-navbar">
        <div className="d-flex flex-wrap align-items-center">
          <div className="logo">ITEP</div>
          <Link className="me-3 ml-3 text-white">Dashboard</Link>
          <Link to="/batch-management" className="me-3 ml-3 text-white">Batch Management</Link>
          <Link to="/admin-profile" className="text-white ml-3">
            Profile
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
          />
          <div>{user.name}</div>
        </div>
      </div>

      {/* Sidebar + Main */}
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div>
            <div className="list-group-item list-group-item-action mt-5 active">
              Dashboard
            </div>
            <Link
              to="/batch-management"
              className="list-group-item list-group-item-action mt-5"
            >
              Batch Management
            </Link>
            <Link
              to="/admin-profile"
              className="list-group-item list-group-item-action mt-5"
            >
              Profile
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-grow-1 p-4">
          <h2>Admin Dashboard</h2>
          <p>Manage your educational platform</p>

          {/* Cards */}
          <div className="d-flex flex-wrap">
            <div className="dashboard-card dashboard-batches">
              <span>Total Batches</span>
              <br />
              <span className="fw-bold fs-5">{batchState.length}</span>
            </div>
            <div className="dashboard-card dashboard-students">
              <span>Total Students</span>
              <br />
              <span className="fw-bold fs-5">{students.length}</span>
            </div>
            <div className="dashboard-card dashboard-teachers">
              <span>Total Teachers</span>
              <br />
              <span className="fw-bold fs-5">{teachers.length}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 d-flex">
            <button
              className={`btn me-2 ${activeTab === "students" ? "btn-success" : "btn-success"
                }`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`btn ${activeTab === "teachers" ? "btn-warning" : "btn-warning"
                }`}
              onClick={() => setActiveTab("teachers")}
            >
              Teachers
            </button>
          </div>

          {/* Students Section */}
          {activeTab === "students" && (
            <section className="mt-4 p-3 bg-white rounded">
              <div className="d-flex justify-content-between flex-wrap">
                <h6 className="mb-0">
                  <b>Students List</b>
                </h6>
                <div>
                  <select value={studentBatchFilter} className="form-select" 
                    onChange={(e) => setStudentBatchFilter(e.target.value)}>
                    <option>select-batch
                    </option>
                    {batchState.map((batch) => (<option key={batch._id} value={batch._id}>{batch.batchName}</option>))}
                  </select>
                </div>
                <div>
                  <Link to="/add-student" className="btn btn-primary me-2">
                    + Add Student
                  </Link>
                  <Link to="/excel-file" className="btn btn-primary">
                    + Upload File
                  </Link>
                </div>
              </div>
              <div className="table-scroll" >
                <table className="table mt-3 table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Batch</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter((s) => {
                        if (!studentBatchFilter) return true; 
                        const batchIds = [
                          ...(Array.isArray(s.batches) ? s.batches : []),
                          ...(s.batch ? [s.batch] : []),
                        ].map((b) => (typeof b === "string" ? b : b._id));
                        return batchIds.includes(studentBatchFilter);
                      })
                      .map((s) => {
                        const batchNames = getBatchNames(s);
                        return (
                          <tr key={s._id}>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>
                              {batchNames.length > 0 ? batchNames.join(", ") : "—"}
                            </td>
                            <td>
                              <button
                                onClick={() => deleteUser(s._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Teachers Section */}
          {activeTab === "teachers" && (
            <section className="mt-4 p-3 bg-white rounded">
              <div className="d-flex justify-content-between flex-wrap">
                <h6 className="mb-0">
                  <b>Teachers List</b>
                </h6>
                <Link to="/add-student" className="btn btn-primary">
                  + Add Teacher
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table mt-3 table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Assigned Batches</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t) => {
                      const batchNames = getBatchNames(t);
                      return (
                        <tr key={t._id}>
                          <td>{t.name}</td>
                          <td>{t.email}</td>
                          <td>
                            {batchNames.length > 0 ? (
                              <div className="d-flex flex-wrap gap-1">
                                {batchNames.map((bn) => (
                                  <p key={bn}>{bn}</p>
                                ))}
                              </div>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={async () => {
                                if (
                                  window.confirm(
                                    `Delete teacher "${t.name}" completely?`
                                  )
                                ) {
                                  await deleteTeacher(t._id);
                                }
                              }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-info ms-2"
                              onClick={() =>
                                setOpenFormFor(
                                  openFormFor === t._id ? null : t._id
                                )
                              }
                            >
                              Edit Batch
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Assign Batch Modal */}
      {openFormFor && (
        <div className="assign-batch-modal">
          <div className="assign-batch-modal-content">
            <h3>Select Batch</h3>
            <select
              className="form-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">-- Select Batch --</option>
              {batchState.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.batchName}
                </option>
              ))}
            </select>
            <div className="mt-3">
              <button
                className="btn btn-primary"
                onClick={() => assignBatchToTeacher(openFormFor, selectedBatch)}
              >
                Assign Batch
              </button>
              <button
                className="btn btn-secondary ms-2"
                onClick={() => setOpenFormFor(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
