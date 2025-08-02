import axios from "axios";
import { useEffect, useState } from "react";
import Backend from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";

function AddStudent() {
    const [allbatch, setAllBatch] = useState([])

    const [state, setState] = useState({
        name: "",
        email: "",
        role: "student",  
        batch: ""
    })

    useEffect(() => {
        loadBatches()
    }, [])

    const loadBatches = async () => {
        try {
            const response = await axios.get(Backend.ALL_BATCHES)
            console.log(response)
            setAllBatch(response.data.getAll)
        }
        catch (err) {
            console.log(err)
        }
    }

    const formSubmit = async (event) => {
        try {
            event.preventDefault()

            if (!state.name.trim()) {
                toast.error("Please enter name");
                return;
            }
            if (!state.email.trim()) {
                toast.error("Please enter email");
                return;
            }
            if (!state.role || state.role === "") {
                toast.error("Please select role");
                return;
            }
            if (!state.batch || state.batch === "") {
                toast.error("Please select batch");
                return;
            }

            const response = await axios.post(Backend.ADD_USER, state)
            setState({
                name: "",
                email: "",
                role: "student",
                batch: ""
            })

            toast.success("Student Addes")
        }
        catch (err) {
            console.log(err)
toast.error("User Already Exist")        
}
    }

    return (
        <>
        <ToastContainer/>
            <div style={{ marginLeft: '400px', marginTop: "200px" }}>
                <form onSubmit={formSubmit} className="form">
                    <div style={{ boxShadow: "0px 0px 3px 0px grey", padding: "20px" }}>
                        <div>
                            <input
                                value={state.name}
                                onChange={(event) => setState({ ...state, name: event.target.value })}
                                className="form-control"
                                type="text"
                                placeholder="Enter Name"
                                required
                            />
                        </div>
                        <div>
                            <input
                                value={state.email}
                                onChange={(event) => setState({ ...state, email: event.target.value })}
                                className="form-control mt-3"
                                type="email"
                                placeholder="Enter Email"
                                required
                            />
                        </div>
                        <div>
                            <select
                                value={state.role}
                                name="role"
                                className="form-control mt-3"
                                onChange={(event) => setState({ ...state, role: event.target.value })}
                                required
                            >
                                <option value="">Select Role</option> 
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div>
                            <select
                                value={state.batch}
                                name="batch"
                                className="form-control mt-3"
                                onChange={(event) => setState({ ...state, batch: event.target.value })}
                                required
                            >
                                <option value="">Select Batch</option>  
                                {allbatch.map((batch, index) => {
                                    return (
                                        <option key={index} value={batch.batchName}>
                                            {batch.batchName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div>
                            <button className="btn btn-primary mt-3 form-control">
                                Add Student
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStudent;