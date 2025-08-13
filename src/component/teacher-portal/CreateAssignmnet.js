
import axios from "axios";
import { useEffect, useState } from "react";
import Backend from "../../apis/Backend";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function CreateAssignmnet() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    instructions: "",
    batchId: "",
    subject: "",
    deadline: "",
    file: null, 
  });

  const user = JSON.parse(sessionStorage.getItem("current-user"));
  const [batch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(false);

  // Send Assignment Function
  const SendAssignment = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!task.title.trim()) {
        toast.error("Assignment title required");
        return;
      }
      if (!task.batchId) {
        toast.error("Please select a batch");
        return;
      }
      if (!task.subject) {
        toast.error("Please select subject");
        return;
      }

      const formData = new FormData();
      formData.append("title", task.title);
      formData.append("batchId", task.batchId);
      formData.append("teacherId", user._id);
      formData.append("description", task.description);
      formData.append("instructions", task.instructions);
      formData.append("subject", task.subject);
      formData.append("deadline", task.deadline);

      if (task.file) {
        formData.append("assignFileName", task.file); 
      }

      const response = await axios.post(Backend.ASSIGNMENT_CREATE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.message) {
        toast.success(response.data.message);
        setTask({
          title: "",
          description: "",
          instructions: "",
          batchId: "",
          teacherId: user._id,
          subject: "",
          deadline: "",
          file: null,
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatch();
  }, []);

  const loadBatch = async () => {
    try {
      const response = await axios.get(Backend.ALL_BATCHES);
      const batches = response.data.getAll || response.data.batches || response.data;
      setAllBatch(batches);
    } catch (err) {
      console.log("Error loading batches:", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa", overflowX: "hidden" }}>
        {/* Header */}
        <div className="row m-0 bg-primary text-white align-items-center p-2">
          <div className="col-12 col-lg-6 d-flex flex-wrap">
            <div className="mr-3">ITEP</div>
            <Link to="/teacher-portal" className="text-white mr-3">Dashboard</Link>
            <Link to="/create-assignment" className="text-white mr-3">Create Assignment</Link>
            <Link to="/teacher-profile" className="text-white">Profile</Link>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-lg-end align-items-center">
            <img
              src={`http://localhost:3000/uploads/profile/${user.profile}`}
              alt="Profile"
              style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
            />
            <span className="ml-2">{user.name}</span>
          </div>
        </div>

        {/* Main Section */}
        <div className="row m-0">
          {/* Sidebar */}
          <div className="col-12 col-md-3 col-lg-2 p-0 text-center" style={{ boxShadow: "0px 0px 3px grey" }}>
            <div className="mt-4">
              <Link to="/teacher-portal" className="list-group-item list-group-item-action mt-3">Dashboard</Link>
              <Link to="/create-assignment" className="list-group-item list-group-item-action mt-3">Create Assignment</Link>
              <Link to="/teacher-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
              <Link to="/submitted" className="list-group-item list-group-item-action mt-3">Submitted Assignment</Link>
            </div>
          </div>

          {/* Assignment Form */}
          <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center p-3">
            <div className="shadow p-4 rounded bg-white w-100" style={{ maxWidth: "800px" }}>
              <h3 className="text-center mb-4 text-primary">Create New Assignment</h3>
              <form onSubmit={SendAssignment}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label>Assignment Title *</label>
                      <input type="text" className="form-control" value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })} />
                    </div>
                    <div className="mb-3">
                      <label>Select Batch *</label>
                      <select className="form-control" value={task.batchId}
                        onChange={(e) => setTask({ ...task, batchId: e.target.value })}>
                        <option value="">Choose batch</option>
                        {batch.map((b) => (
                          <option key={b._id} value={b._id}>{b.batchName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label>Select Subject *</label>
                      <select className="form-control" value={task.subject}
                        onChange={(e) => setTask({ ...task, subject: e.target.value })}>
                        <option value="">Choose subject</option>
                        <option value="technical">Technical</option>
                        <option value="softskil">Soft Skill</option>
                        <option value="aptitude">Aptitude</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Deadline</label>
                      <input type="date" className="form-control" value={task.deadline}
                        onChange={(e) => setTask({ ...task, deadline: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label>Description</label>
                  <textarea className="form-control" rows="3"
                    value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
                </div>

                <div className="mb-3">
                  <label>Instructions</label>
                  <textarea className="form-control" rows="3"
                    value={task.instructions} onChange={(e) => setTask({ ...task, instructions: e.target.value })}></textarea>
                </div>

                <div className="mb-4">
                  <label>Upload File (Optional)</label>
                  <input type="file" className="form-control"
                    onChange={(e) => setTask({ ...task, file: e.target.files[0] })} />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Creating..." : "Create Assignment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAssignmnet;
