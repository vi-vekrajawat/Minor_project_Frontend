
import { useContext, useState } from "react";
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

  const filteredTask = task.filter((t) => t.batchId === user.batch);
  const [fileName, setFileName] = useState(null);

  const [submitData, setSubmitData] = useState({
    userId: user?._id,
    assignmentId: "",
    batchId: user.batch, // Set user's batch directly
    fileName: "",
    description: "",
    feedback: "",
    status: "pending",
  });

  console.log("Filtered tasks for submission:", filteredTask.map(t => ({ id: t._id, title: t.title, batchId: t.batchId })));
  console.log("User batch:", user.batch);

  const slectAssignment = (index) => {
    console.log("Selected assignment index:", index);
    console.log("Selected assignment data:", filteredTask[index]);

    let selectedBox = document.getElementById(index);
    let rightPane = document.getElementById("select");

    rightPane.innerHTML = selectedBox.innerText;

    setSubmitData((prev) => ({
      ...prev,
      assignmentId: filteredTask[index]?._id, 
      batchId: user.batch 
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
        feedback: event.target.value
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

    console.log("Submitting data:", {
      userId: submitData.userId,
      assignmentId: submitData.assignmentId,
      batchId: user.batch,
      description: submitData.description,
      feedback: submitData.feedback,
      status: submitData.status
    });

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
      
      
    } catch (err) {
      console.error("Submission error:", err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Submission failed");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh", width: "100vw", overflowX: "hidden" }}>
        
        <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
          <div className="d-flex flex-wrap align-items-center">
            <div className="mr-3 font-weight-bold">ITEP</div>
            <Link to="/student" className="mr-3 text-white" style={{ textDecoration: "none" }}>Dashboard</Link>
            <Link className="mr-3 text-white" style={{ textDecoration: "none" }}>My Assignment</Link>
            <Link to="/student-profile" className="text-white" style={{ textDecoration: "none" }}>Profile</Link>
          </div>
          <div className="d-flex align-items-center mt-2 mt-md-0">
            <img
              src={`${BASE_URL}/uploads/profile/${user.profile}`}
              alt="Profile"
              style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span className="ml-2">{user.name}</span>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row">
          <div
            className="text-center bg-white"
            style={{
              boxShadow: "0px 0px 3px grey",
              minHeight: "500px",
              width: "100%",
              maxWidth: "200px"
            }}
          >
            <div className="mt-5">
              <Link to="/student" className="list-group-item list-group-item-action mt-3">Dashboard</Link>
              <Link className="list-group-item list-group-item-action mt-3">My Assignment</Link>
              <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
            </div>
          </div>

          <div className="flex-grow-1 p-4">
            <h2>Submit Assignment</h2>
            <p>Choose an assignment to submit your work</p>
            
            <div className="mb-3 p-2 bg-light small">
              <strong>Debug Info:</strong> User Batch: {user.batch} | Available Assignments: {filteredTask.length}
            </div>

            <div className="d-flex flex-column flex-lg-row mt-4">
              <div className="p-2 flex-grow-1" style={{ boxShadow: "0px 0px 3px grey", maxHeight: "370px", overflowY: "auto" }}>
                <h6 style={{ position: "sticky", top: 0, backgroundColor: "grey", color: "white" }}>Available Assignment ({filteredTask.length})</h6>
                {filteredTask.length > 0 ? (
                  filteredTask.map((data, index) => (
                    <div
                      key={data._id}
                      id={index}
                      onClick={() => slectAssignment(index)}
                      className="mt-3 p-2"
                      style={{ border: "0.1px solid grey", cursor: "pointer" }}
                    >
                      <small><b>Title:</b> {data.title}</small><br />
                      <small><b>Subject:</b> {data.subject}</small><br />
                      <small><b>Deadline:</b> {data.deadline?.slice(0, 10)}</small><br />
                      <small className="text-muted">ID: {data._id}</small>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted mt-3">No assignments available for your batch</p>
                )}
              </div>

              <form onSubmit={taskSubmit} className="flex-grow-1 mt-4 mt-lg-0 ml-lg-4">
                <div className="p-3" style={{ boxShadow: "0px 0px 3px grey" }}>
                  <div id="select" style={{ minHeight: "100px", overflowY: "auto", border: "1px dashed #ccc", padding: "10px" }}>
                    Select an Assignment
                  </div>
                  
                  {submitData.assignmentId && (
                    <div className="mt-2 p-2 bg-success text-white small rounded">
                      Selected Assignment: {submitData.assignmentId}
                    </div>
                  )}
                  
                  <div className="text-center mt-3" style={{ height: "100px", border: "1px dashed grey" }}>
                    <input 
                      onChange={(e) => setFileName(e.target.files[0])} 
                      className="mt-4" 
                      type="file" 
                    />
                  </div>
                  <select
                    className="btn btn-secondary mt-2 w-100"
                    value={submitData.status}
                    onChange={(e) => setSubmitData((prev) => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="pending">Pending</option>
                    <option value="complete">Complete</option>
                  </select>
                  <button 
                    className="btn btn-primary mt-3 w-100"
                    disabled={!submitData.assignmentId}
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

export default SubmitAssignment;