import axios from "axios";
import { useEffect, useState } from "react";
import Backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./SubmitAssignment.css";

function SubmitAssignment() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    instructions: "",
    batchId: "",
    subject: "",
    deadline: "",
    file: null,
  });
  const [allBatch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("current-user"));

  useEffect(() => {
    loadBatch();
  }, []);

  const loadBatch = async () => {
    try {
      const response = await axios.get(Backend.ALL_BATCHES);
      let batches = response.data.getAll || response.data.batches || response.data;

      const accessible = user?.accessibleBatches || [];
      const userBatch = user.batch ? [user.batch] : [];
      const allowedBatchIds = [...new Set([...accessible, ...userBatch])];

      const filtered = batches.filter((b) => allowedBatchIds.includes(b._id));
      setAllBatch(filtered);

      if (user.role === "student" && filtered.length > 0) {
        setTask((prev) => ({ ...prev, batchId: filtered[0]._id }));
      }
    } catch (err) {
      console.log("Error loading batches:", err);
      toast.error("Failed to load batches");
    }
  };

  const handleBatchChange = (e) => setTask({ ...task, batchId: e.target.value });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  const handleFileChange = (e) => setTask({ ...task, file: e.target.files[0] });

  const submitAssignment = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!task.title.trim()) return toast.error("Assignment title required");
    if (!task.batchId) return toast.error("Please select a batch");
    if (!task.subject) return toast.error("Please select a subject");

    const formData = new FormData();
    formData.append("title", task.title);
    formData.append("batchId", task.batchId);
    formData.append("teacherId", user._id);
    formData.append("description", task.description);
    formData.append("instructions", task.instructions);
    formData.append("subject", task.subject);
    formData.append("deadline", task.deadline);
    if (task.file) formData.append("assignFileName", task.file);

    try {
      const res = await axios.post(Backend.ASSIGNMENT_CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.message) {
        toast.success(res.data.message);
        setTask({ title: "", description: "", instructions: "", batchId: "", subject: "", deadline: "", file: null });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa", overflowX: "hidden" }}>
        {/* Header */}
        <div className="submit-header">
          <div>
            <span>ITEP</span>
            <Link to="/teacher-portal" className="text-white" style={{ marginLeft: "15px", textDecoration: "none" }}>Dashboard</Link>
            <Link to="/create-assignment" className="text-white" style={{ marginLeft: "15px", textDecoration: "none" }}>Create Assignment</Link>
            <Link to="/teacher-profile" className="text-white" style={{ marginLeft: "15px", textDecoration: "none" }}>Profile</Link>
          </div>
          <div>
            <img src={`${BASE_URL}/uploads/profile/${user.profile}`} alt="Profile" />
            <span>{user.name}</span>
          </div>
        </div>

        {/* Main Section */}
        <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
          {/* Sidebar */}
          <div className="submit-sidebar text-center">
            <Link to="/teacher-portal" className="list-group-item list-group-item-action  ">Dashboard</Link>
            <Link className="list-group-item list-group-item-action mt-5 active">Create Assignment</Link>
            <Link to="/teacher-profile" className="list-group-item list-group-item-action mt-5 ">Profile</Link>
            <Link to="/submitted" className="list-group-item list-group-item-action mt-5 ">Submitted Assignment</Link>
          </div>

          {/* Form */}
          <div style={{ flexGrow: 1, padding: "20px" }}>
            <div className="submit-form-container">
              <h3 className="text-center mb-4 text-primary">Create New Assignment</h3>
              <form onSubmit={submitAssignment}>
                <label>Assignment Title *</label>
                <input type="text" name="title" className="form-control" value={task.title} onChange={handleInputChange} />

                <label>Select Batch *</label>
                <select name="batchId" className="form-control" value={task.batchId} onChange={handleBatchChange} disabled={user.role === "student"}>
                  <option value="">Choose batch</option>
                  {allBatch.map((b) => <option key={b._id} value={b._id}>{b.batchName}</option>)}
                </select>

                <label>Select Subject *</label>
                <select name="subject" className="form-control" value={task.subject} onChange={handleInputChange}>
                  <option value="">Choose subject</option>
                  <option value="technical">Technical</option>
                  <option value="softskill">Soft Skill</option>
                  <option value="aptitude">Aptitude</option>
                </select>

                <label>Deadline</label>
                <input type="date" name="deadline" className="form-control" value={task.deadline} onChange={handleInputChange} />

                <label>Description</label>
                <textarea name="description" className="form-control" rows="3" value={task.description} onChange={handleInputChange}></textarea>

                <label>Instructions</label>
                <textarea name="instructions" className="form-control" rows="3" value={task.instructions} onChange={handleInputChange}></textarea>

                <label>Upload File (Optional)</label>
                <input type="file" className="form-control" onChange={handleFileChange} />

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Submitting..." : "New Assignment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitAssignment;
