import axios from "axios";
import { useEffect, useState } from "react";
import Backend from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css"; 

function AddStudent() {
  const navigate = useNavigate();
  const [allbatch, setAllBatch] = useState([]);
  const [state, setState] = useState({
    name: "",
    email: "",
    role: "student",
    batch: "",
  });

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const response = await axios.get(Backend.ALL_BATCHES);
      setAllBatch(response.data.getAll);
    } catch (err) {
      console.log(err);
    }
  };

  const formSubmit = async (event) => {
    event.preventDefault();

    if (!state.name.trim()) return toast.error("Please enter name");
    if (!state.email.trim()) return toast.error("Please enter email");
    if (!state.role) return toast.error("Please select role");
    if (!state.batch) return toast.error("Please select batch");

    try {
      await axios.post(Backend.ADD_USER, state);
      toast.success("Student Added Successfully");
      setState({ name: "", email: "", role: "student", batch: "" });
      navigate("/admin");
    } catch (err) {
      console.log(err);
      toast.error("User Already Exists");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center add-student-container">
        <div className="card shadow-lg p-4 add-student-card">
          <h3 className="text-center mb-3 text-primary">Add User</h3>
          <p className="text-center text-muted">
            Enter student details and assign a batch
          </p>

          <form onSubmit={formSubmit}>
            {/* Name */}
            <div className="form-group">
              <label className="font-weight-bold">Full Name</label>
              <input
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                type="text"
                className="form-control"
                placeholder="Enter Name"
              />
            </div>

            {/* Email */}
            <div className="form-group mt-3">
              <label className="font-weight-bold">Email Address</label>
              <input
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                type="email"
                className="form-control"
                placeholder="Enter Email"
              />
            </div>

            {/* Role */}
            <div className="form-group mt-3">
              <label className="font-weight-bold">Role</label>
              <select
                value={state.role}
                onChange={(e) => setState({ ...state, role: e.target.value })}
                className="form-control"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            {/* Batch */}
            <div className="form-group mt-3">
              <label className="font-weight-bold">Batch</label>
              <select
                value={state.batch}
                onChange={(e) => setState({ ...state, batch: e.target.value })}
                className="form-control"
              >
                <option value="">Select Batch</option>
                {allbatch.map((batch, index) => (
                  <option key={index} value={batch.batchName}>
                    {batch.batchName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block mt-4 add-student-btn"
            >
              Add User
            </button>
            <button
            onClick={()=>navigate(-1)}
              className="btn btn-secondary btn-block mt-4 add-student-btn"
            >
              Cancel
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default AddStudent;
