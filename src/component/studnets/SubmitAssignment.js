
import { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "../../context/AssignmentProvider";
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { BatchContext } from "../../context/BatchProvider";

function SubmitAssignment() {
  const { task } = useContext(AssignmentContext);
  const { batchState } = useContext(BatchContext);
  const user = getCurrentUser();

  const [fileName, setFileName] = useState(null);
  const [submitted, setSubmitted] = useState([]);
  const [unsubmittedTasks, setUnsubmittedTasks] = useState([]);

  const [submitData, setSubmitData] = useState({
    userId: user?._id,
    assignmentId: "",
    batchId: user.batch,
    fileName: "",
    description: "",
    feedback: "",
    status: "pending",
  });

  useEffect(() => {
    const fetchSubmittedAssignments = async () => {
      try {
        const response = await axios.get(
          Backend.SUBMIT_ASSIGNMENT_BYID + `/${user._id}`
        );
        setSubmitted(response.data.submissions);

        const batchTasks = task.filter((t) => t.batchId === user.batch);
        const remainingTasks = batchTasks.filter(
          (t) =>
            !response.data.submissions.some((s) => {
              const submittedId =
                typeof s.assignmentId === "object"
                  ? s.assignmentId._id
                  : s.assignmentId;
              return submittedId === t._id;
            })
        );

        setUnsubmittedTasks(remainingTasks);
      } catch (err) {
        console.log("Error fetching submitted assignments", err);
      }
    };

    fetchSubmittedAssignments();
  }, [task, user._id, user.batch]);

  const slectAssignment = (index) => {
    const selected = unsubmittedTasks[index];
    let rightPane = document.getElementById("select");
    rightPane.innerHTML = `${selected.title} (${selected.subject})`;

    setSubmitData((prev) => ({
      ...prev,
      assignmentId: selected?._id,
      batchId: user.batch,
    }));

    const inputWrapper = document.createElement("div");
    inputWrapper.style.marginTop = "10px";
    inputWrapper.style.display = "flex";
    inputWrapper.style.flexDirection = "column";
    inputWrapper.style.gap = "10px";
    inputWrapper.style.maxHeight = "150px";
    inputWrapper.style.overflowY = "auto";

    const description = document.createElement("textarea");
    description.placeholder = "Description";
    description.rows = 3;
    description.style.resize = "none";
    description.addEventListener("input", (event) => {
      setSubmitData((prev) => ({ ...prev, description: event.target.value }));
    });

    const feedback = document.createElement("textarea");
    feedback.placeholder = "Feedback";
    feedback.rows = 3;
    feedback.style.resize = "none";
    feedback.addEventListener("input", (event) => {
      setSubmitData((prev) => ({
        ...prev,
        feedback: event.target.value,
      }));
    });

    inputWrapper.append(description, feedback);
    rightPane.appendChild(inputWrapper);
  };

  const taskSubmit = async (event) => {
    event.preventDefault();

    if (!submitData.assignmentId) {
      toast.error("Please select an assignment first!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", submitData.userId);
    formData.append("assignmentId", submitData.assignmentId);
    formData.append("batchId", user.batch);
    formData.append("description", submitData.description);
    formData.append("feedback", submitData.feedback);
    formData.append("fileName", fileName);
    formData.append("status", submitData.status);

    try {
      const response = await axios.post(Backend.SUBMISSION, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message);

      setSubmitData({
        userId: user?._id,
        assignmentId: "",
        batchId: user.batch,
        fileName: "",
        description: "",
        feedback: "",
        status: "pending",
      });
      setFileName(null);
      document.getElementById("select").innerHTML = "Select an Assignment";

      const submittedRes = await axios.get(
        Backend.SUBMIT_ASSIGNMENT_BYID + `/${user._id}`
      );
      setSubmitted(submittedRes.data.submissions);
      const remainingTasks = task
        .filter((t) => t.batchId === user.batch)
        .filter(
          (t) =>
            !submittedRes.data.submissions.some((s) => {
              const submittedId =
                typeof s.assignmentId === "object"
                  ? s.assignmentId._id
                  : s.assignmentId;
              return submittedId === t._id;
            })
        );
      setUnsubmittedTasks(remainingTasks);
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            backgroundColor: "#007bff",
            color: "white",
            padding: "15px 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontWeight: "bold", marginRight: "15px" }}>ITEP</div>
            <Link to="/student" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>Dashboard</Link>
            <Link style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>My Assignment</Link>
            <Link to="/student-profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <img
              src={`${BASE_URL}/uploads/profile/${user.profile}`}
              alt="Profile"
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <span>{user.name}</span>
          </div>
        </div>

        {/* Main */}
        <div style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
          {/* Sidebar */}
          <div style={{
            backgroundColor: "white",
            boxShadow: "0 0 5px gray",
            minHeight: "500px",
            width: "200px",
            paddingTop: "40px",
          }}>
            <Link to="/student" style={linkStyle}>Dashboard</Link>
            <Link style={linkStyle}>My Assignment</Link>
            <Link to="/student-profile" style={linkStyle}>Profile</Link>
          </div>

          {/* Content */}
          <div style={{ flexGrow: 1, marginLeft: "20px" }}>
            <h2 style={{ marginBottom: "10px" }}>Submit Assignment</h2>
            <p>Choose an assignment to submit your work</p>

            <div style={{
              backgroundColor: "#e9ecef",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
              fontSize: "0.9rem",
            }}>
              {/* Debug Info: User Batch: {user.batch} | Available Assignments: {unsubmittedTasks.length} */}
            </div>

            <div style={{ display: "flex", flexDirection: "row", gap: "20px", flexWrap: "wrap" }}>
              {/* Assignment List */}
              <div style={{
                flex: 1,
                maxHeight: "400px",
                overflowY: "auto",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 0 5px gray",
                borderRadius: "5px",
              }}>
                <h4 style={{ position: "sticky", top: 0, backgroundColor: "#6c757d", color: "white", padding: "5px", margin: 0 }}>Available Assignment ({unsubmittedTasks.length})</h4>
                {unsubmittedTasks.length > 0 ? (
                  unsubmittedTasks.map((data, index) => (
                    <div
                      key={data._id}
                      onClick={() => slectAssignment(index)}
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <b>Title:</b> {data.title}<br/>
                      <b>Subject:</b> {data.subject}<br/>
                      <b>Deadline:</b> {data.deadline?.slice(0,10)}
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", marginTop: "15px", color: "#6c757d" }}>No assignments available</p>
                )}
              </div>

              {/* Submission Form */}
              <form onSubmit={taskSubmit} style={{ flex: 1 }}>
                <div style={{
                  padding: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 5px gray",
                  borderRadius: "5px",
                }}>
                  <div id="select" style={{
                    minHeight: "80px",
                    border: "2px dashed #ccc",
                    padding: "10px",
                    overflowY: "auto",
                    marginBottom: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#f1f3f5",
                  }}>
                    Select an Assignment
                  </div>

                  {submitData.assignmentId && (
                    <div style={{
                      padding: "5px 10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      borderRadius: "5px",
                      marginBottom: "10px",
                    }}>
                      Selected Assignment: {submitData.assignmentId}
                    </div>
                  )}

                  <input
                    type="file"
                    onChange={(e) => setFileName(e.target.files[0])}
                    style={{ marginBottom: "10px" }}
                  />

                  <select
                    value={submitData.status}
                    onChange={(e) =>
                      setSubmitData((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }))
                    }
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                  </select>

                  <button
                    type="submit"
                    disabled={!submitData.assignmentId}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Submit Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const linkStyle = {
  display: "block",
  padding: "10px",
  color: "#333",
  textDecoration: "none",
  borderBottom: "1px solid #ccc",
  transition: "0.3s",
};

export default SubmitAssignment;
