import { useContext, useEffect, useState } from "react"
import { AssignmentContext } from "../../context/AssignmentProvider"
import axios from "axios"
import Backend, { BASE_URL } from "../../apis/Backend"
import { toast, ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../auth/Auth"
function SubmitAssignment() {
    const { task } = useContext(AssignmentContext)
    const [fileName, setFileName] = useState(null);

    // const user = JSON.parse(sessionStorage.getItem("current-user"))
    const user = getCurrentUser()
    console.log(user)

    const [submitData, setSubmitData] = useState({
        userId: user?._id,
        assignmentId: "",
        fileName: "",
        description: "",
        feedback: "",
        status:""
    })

    

    const slectAssignment = (index) => {
        let selectedBox = document.getElementById(index);
        let rightPane = document.getElementById("select");

        // Reset content
        rightPane.innerHTML = selectedBox.innerText;

        // Wrapper for textareas
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
        description.style.width = "100%";
        description.addEventListener("input", (event) => {
            setSubmitData((prev) => ({ ...prev, description: event.target.value }))
        })
        const feedback = document.createElement("textarea");
        feedback.placeholder = "Feedback";
        feedback.rows = 3;
        feedback.style.resize = "none";
        feedback.style.width = "100%";
        feedback.addEventListener("input", (event) => {
            setSubmitData((prev) => ({ ...prev, feedback: event.target.value, assignmentId: task[index]?._id }))
        })

        inputWrapper.append(description, feedback);
        rightPane.appendChild(inputWrapper);
    }

    const taskSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("userId", submitData.userId)
        formData.append("assignmentId", submitData.assignmentId)
        formData.append("description", submitData.description)
        formData.append("feedback", submitData.feedback)
        formData.append("fileName", fileName)
        formData.append("status",submitData.status) 

        try {
            const response = await axios.post(Backend.SUBMISSION, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            toast.success(response.data.message)
        } catch (err) {
            console.log(err)
            toast.error("Submission failed")
        }
    }

    return <>
        <ToastContainer></ToastContainer>
        <div>
            <div className="d-flex bg-primary text-white "  style={{ backgroundColor: "#f0f0f0",  width: "1290px" }} >
                <div className="d-flex bg-primary text-white  justify-content-between  align-items-center flex-wrap">
                    <div className="d-flex flex-wrap align-items-center">
                    <div className="mr-3 font-weight-bold ml-3 mt-2">ITEP</div>
                    <Link  style={{textDecoration: "none",color: "inherit"}}  to="/student" className="ml-3 mt-2">Dashboard</Link>
                    <Link  style={{textDecoration: "none",color: "inherit"}}  className="ml-3 mt-2">My Assignment</Link>
                    <Link  style={{textDecoration: "none",color: "inherit"}}  to="student-profile" className="ml-3 mt-2">Profile</Link>
                </div>


               <div className="d-flex " style={{ marginLeft: "1100px" }}>
                    <div className="ml-3 " style={{position:"relative",bottom:"15px"}}>
                        <img
                            src={`${BASE_URL}/uploads/profile/${user.profile}`}
                            alt="Profile"
                            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="ml-3 "style={{position:"relative",bottom:"15px"}}>{user.name}</div>
                </div>
                </div>
            </div>
            <div className="d-flex">

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width: "180px" }}>
                    <div className="mt-5">
                        <Link to="/student" className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</Link>
                        <Link className="mt-5 mr-3 list-group-item list-group-item-action">My Assignment</Link>
                        <Link to="/student-profile" className="mt-5 mr-3 list-group-item list-group-item-action">Profile</Link>
                    </div>
                </div>
                <div className="ml-5 mt-2">
                    <div>
                        <div>
                            <h2>Submit Assignment</h2>
                            <p>Choose an assignment to submit your work</p>
                        </div>
                    </div>
                    <div className="mt-5 p-2" >
                        <div>
                            <div className="d-flex " >
                                <div className="p-2"  style={{ boxShadow: "0px 0px 3px 0px grey" ,maxHeight:"370px",overflowY:"auto" }}>
                                    <h6 style={{position:"sticky",top:0,backgroundColor:'grey',color:"white"}}>Available Assignment</h6>
                                    {task.map((data, index) => {
                                        return <div id={index} onClick={() => slectAssignment(index)} className="mt-3 p-1" style={{ border: "0.1px solid grey" }}>
                                            <small><b>Title :</b> {data.title}</small><br />
                                            <small><b>Subject :</b> {data.subject}</small><br />
                                            <small><b>DeadLine :</b> {data.deadline?.slice(0, 10)}</small><br />


                                        </div>
                                    })}
                                </div>
                                <form onSubmit={taskSubmit}>
                                    <div className="p-1" style={{ boxShadow: "0px 0px 3px 0px grey", marginLeft: "50px" }}>
                                        <div id="select" style={{ minHeight: "100px", overflowY: "auto" }}>
                                            Select an Assignment
                                        </div>
                                        <div className=" text-center mt-1 " style={{ height: "100px", border: "dashed" }}>
                                            <input onChange={(event) => setFileName(event.target.files[0])} className="mt-4 ml-5" type="file" />
                                        </div>
                                        <button className="btn btn-primary mt-2 ml-1">Submit</button>
                                        <select className="btn btn-secondary mt-2" style={{marginLeft:"85px"}} name="" id=""   value={submitData.status} onChange={(e) => setSubmitData((prev) => ({ ...prev, status: e.target.value }))}>
                                            <option value="pending">Pending</option>
                                            <option value="complete">Complete</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div>


                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    </>
}

export default SubmitAssignment


