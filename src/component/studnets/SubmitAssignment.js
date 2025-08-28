import { useContext, useEffect, useState } from "react";
import { AssignmentContext } from "../../context/AssignmentProvider";
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../auth/Auth";
import { BatchContext } from "../../context/BatchProvider";
import "./SubmitAssignment.css";

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
      <div className="submit-container">
        {/* Header */}
        <div className="submit-header">
          <div className="header-links">
            <div >ITEP</div>
            <Link to="/student">Dashboard</Link>
            <Link>My Assignment</Link>
            <Link to="/student-profile">Profile</Link>
          </div>
          <div className="header-profile">
            <img src={`${BASE_URL}/uploads/profile/${user.profile}`} alt="Profile" />
            <span>{user.name}</span>
          </div>
        </div>

        {/* Main layout */}
        <div className=" d-flex flex-column flex-md-row ">
       <div className="text-center bg-white shadow-sm " style={{minWidth:"200px"}}>
          <div className="mt-5 d-flex flex-column align-items-start">
            <Link
              to="/student"
              className="list-group-item list-group-item-action w-100"
            >
              Dashboard
            </Link>
            <Link
              to="/submission"
              className="list-group-item list-group-item-action w-100 active"
            >
              My Assignment
            </Link>
            <Link
              to="/student-profile"
              className="list-group-item list-group-item-action w-100 "
            >
              Profile
            </Link>
          </div>
        </div>

          <div style={{ flexGrow: 1, marginLeft: "20px" }}>
            <h2>Submit Assignment</h2>
            <p>Choose an assignment to submit your work</p>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div className="assignment-list">
                <h4>Available Assignment ({unsubmittedTasks.length})</h4>
                {unsubmittedTasks.length > 0 ? (
                  unsubmittedTasks.map((data, index) => (
                    <div
                      key={data._id}
                      onClick={() => slectAssignment(index)}
                      className="assignment-item"
                    >
                      <b>Title:</b> {data.title}<br />
                      <b>Subject:</b> {data.subject}<br />
                      <b>Deadline:</b> {data.deadline?.slice(0, 10)}
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center", marginTop: "15px", color: "#6c757d" }}>No assignments available</p>
                )}
              </div>

              <form onSubmit={taskSubmit} className="submit-form">
                <div className="submit-form-inner">
                  <div id="select" className="assignment-select-box">Select an Assignment</div>
                  <input type="file" onChange={(e) => setFileName(e.target.files[0])} />
                  <select
                    value={submitData.status}
                    onChange={(e) => setSubmitData(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                  </select>
                  <button type="submit" disabled={!submitData.assignmentId} className="submit-btn">
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

export default SubmitAssignment;
