
import axios from "axios";
import { useEffect, useState } from "react";
import Backend, { BASE_URL } from "../../apis/Backend";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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

  // 🔹 Load Batches
  useEffect(() => {
    loadBatch();
    // eslint-disable-next-line
  }, []);

  const loadBatch = async () => {
    try {
      const response = await axios.get(Backend.ALL_BATCHES);
      let batches = response.data.getAll || response.data.batches || response.data;

      // Fix accessibleBatches
      const accessible = user?.accessibleBatches || []; // directly use array
      const userBatch = user.batch ? [user.batch] : [];
      const allowedBatchIds = [...new Set([...accessible, ...userBatch])];

      // Filter batches that are allowed
      const filtered = batches.filter((b) => allowedBatchIds.includes(b._id));

      setAllBatch(filtered);

      // Default selection for student
      if (user.role === "student" && filtered.length > 0) {
        setTask((prev) => ({ ...prev, batchId: filtered[0]._id }));
      }
    } catch (err) {
      console.log("Error loading batches:", err);
      toast.error("Failed to load batches");
    }
  };

  const handleBatchChange = (e) => {
    setTask({ ...task, batchId: e.target.value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleFileChange = (e) => {
    setTask({ ...task, file: e.target.files[0] });
  };

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
        setTask({
          title: "",
          description: "",
          instructions: "",
          batchId: "",
          subject: "",
          deadline: "",
          file: null,
        });
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

          {/* Form Section */}
          <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center p-3">
            <div className="shadow p-4 rounded bg-white w-100" style={{ maxWidth: "800px" }}>
              <h3 className="text-center mb-4 text-primary">Submit Assignment</h3>
              <form onSubmit={submitAssignment}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label>Assignment Title *</label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={task.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Select Batch *</label>
                      <select
                        name="batchId"
                        className="form-control"
                        value={task.batchId}
                        onChange={handleBatchChange}
                        disabled={user.role === "student"}
                      >
                        <option value="">Choose batch</option>
                        {allBatch.map((b) => (
                          <option key={b._id} value={b._id}>{b.batchName}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label>Select Subject *</label>
                      <select
                        name="subject"
                        className="form-control"
                        value={task.subject}
                        onChange={handleInputChange}
                      >
                        <option value="">Choose subject</option>
                        <option value="technical">Technical</option>
                        <option value="softskill">Soft Skill</option>
                        <option value="aptitude">Aptitude</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Deadline</label>
                      <input
                        type="date"
                        name="deadline"
                        className="form-control"
                        value={task.deadline}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={task.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label>Instructions</label>
                  <textarea
                    name="instructions"
                    className="form-control"
                    rows="3"
                    value={task.instructions}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label>Upload File (Optional)</label>
                  <input type="file" className="form-control" onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Assignment"}
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
