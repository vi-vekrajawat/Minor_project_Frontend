
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { BatchContext } from "../../context/BatchProvider";
import { getCurrentUser } from "../auth/Auth";

function Admin() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("students");
  const { batchState } = useContext(BatchContext);
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

  // ✅ Updated Delete Teacher Function
  const deleteTeacher = async (teacherId, batchId = null) => {
    try {
      const url = batchId
        ? `${backend.DELETE_TEACHER}/${teacherId}/${batchId}`
        : `${backend.DELETE_TEACHER}/${teacherId}`;

      await axios.delete(url);

      alert("Teacher deleted ✅");
      loadUsers();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || "Error deleting teacher ❌");
    }
  };

  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3">
        <div className="d-flex flex-wrap align-items-center">
          <div className="me-3 fw-bold">ITEP</div>
          <div className="me-3">Dashboard</div>
          <div className="me-3">Batch Management</div>
          <Link to="/admin-profile" className="text-white">
            Profile
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "8px",
            }}
          />
          <div>{user.name}</div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <aside
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

          {/* Summary Cards */}
          <div className="d-flex flex-wrap">
            <div className="text-center bg-primary text-white p-3 m-2 flex-fill rounded">
              <span>Total Batches</span>
              <br />
              <span className="fw-bold fs-5">{batchState.length}</span>
            </div>
            <div className="text-center bg-success text-white p-3 m-2 flex-fill rounded">
              <span>Total Students</span>
              <br />
              <span className="fw-bold fs-5">{students.length}</span>
            </div>
            <div
              className="text-center text-white p-3 m-2 flex-fill rounded"
              style={{ backgroundColor: "orange" }}
            >
              <span>Total Teachers</span>
              <br />
              <span className="fw-bold fs-5">{teachers.length}</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="mt-4 d-flex">
            <button
              className={`btn me-2 ${
                activeTab === "students" ? "btn-success" : "btn-success"
              }`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`btn ${
                activeTab === "teachers" ? "btn-warning" : "btn-warning"
              }`}
              onClick={() => setActiveTab("teachers")}
            >
              Teachers
            </button>
          </div>

          {/* Students List */}
          {activeTab === "students" && (
            <section className="mt-4 p-3 bg-white rounded">
              <div className="d-flex justify-content-between flex-wrap">
                <h6 className="mb-0">
                  <b>Students List</b>
                </h6>
                <div>
                  <Link to="/add-student" className="btn btn-primary me-2">
                    + Add Student
                  </Link>
                  <Link to="/excel-file" className="btn btn-primary">
                    + Upload File
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mt-3 table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => {
                      const batchNames = getBatchNames(s);
                      return (
                        <tr key={s._id}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>
                            {batchNames.length > 0
                              ? batchNames.join(", ")
                              : "—"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Teachers List */}
          {activeTab === "teachers" && (
            <section className="mt-4 p-3 bg-white rounded">
              <div className="d-flex justify-content-between flex-wrap">
                <h6 className="mb-0">
                  <b>Teachers List</b>
                </h6>
                <Link to="/add-teacher" className="btn btn-primary">
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
                                  <span
                                    key={bn}
                                    className="badge bg-secondary"
                                    style={{ fontWeight: 500 }}
                                  >
                                    {bn}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>
                            {batchNames.length > 0 ? (
                              batchNames.map((b) => (
                                <button
                                  key={b}
                                  className="btn btn-danger btn-sm me-1 mb-1"
                                  onClick={async () => {
                                    if (
                                      window.confirm(
                                        `Remove teacher "${t.name}" from batch "${b}"?`
                                      )
                                    ) {
                                      // Find batchId by name
                                      const batchObj = batchState.find(
                                        (x) => x.batchName === b
                                      );
                                      await deleteTeacher(t._id, batchObj?._id);
                                    }
                                  }}
                                >
                                  Remove from {b}
                                </button>
                              ))
                            ) : (
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
                            )}
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
    </div>
  );
}

export default Admin;
