import axios from "axios"
import { useEffect, useState } from "react"
import Backend, { BASE_URL } from "../../apis/Backend"
import { Link } from "react-router-dom"
import { getCurrentUser } from "../auth/Auth"

function TeacherPortal() {

    const [assignment,setAssignment] = useState([])

// const user = JSON.parse(sessionStorage.getItem("current-user"))
const user = getCurrentUser()
    useEffect(()=>{
        loadAssignment()
    },[])

    const loadAssignment = async()=>{
        try{
            const response = await axios.get(Backend.GET_AAASIGNMENT)
            console.log(response)
            const assignments = response.data.assignment
            setAssignment(assignments)
        }
        catch(err){
            console.log("Something is error")
        }
    }
    return <>
        <div>
            <div className="d-flex bg-primary text-white p-2">
                <div className="d-flex">
                    <div >ITEP</div>
                    <div className="ml-3">Dashboard</div>
                    <div className="ml-3">Create Assignment</div>
                    <div className="ml-3">Profile</div>
                </div>


               <div className="d-flex" style={{ marginLeft: "800px" }}>
                    <div className="ml-3">
                        <img
                            src={`${BASE_URL}/uploads/profile/${user.profile}`}
                            alt="Profile"
                            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="ml-3 mt-2 ">{user.name}</div>
                </div>
            </div>
            <div className="d-flex">

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width:"180px" }}>
                    <div className="mt-5">
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</div>
                        <Link to="/create-assignment" className="mt-5 mr-3 list-group-item list-group-item-action">Create Assignment</Link>
                        <Link to="/teacher-profile" className="mt-5 mr-3 list-group-item list-group-item-action">Profile</Link>
                        <Link to="/submitted" className="mt-5 mr-3 list-group-item list-group-item-action">Submitted Assignment</Link>

                    </div>
                </div>
                <div className="ml-5">
                    <div>
                        <div>
                            <h2>Teacher Dashboard</h2>
                            <p>Manage your classes and assignments</p>
                        </div>
                        <div className="d-flex ">
                            <div className="text-center bg-primary text-white " style={{ width: "200px", height: "60px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Total Batches</span><br />
                                <span >3</span>
                                <img className="ml-5" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7Av_WNQOfLg8elfZ-Zg2QHuPXRIEtMgoSQ-43jTOZRyTBAhKp" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center bg-success text-white" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Total Students</span><br></br>
                                <span>4</span>
                                <img className="ml-5" src="https://downloadr2.apkmirror.com/wp-content/uploads/2024/08/50/66c88e18416fc_com.android.contacts-384x384.png" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', backgroundColor: "purple" }}>
                                <span>Active Assignment</span><br />
                                <span>5</span>
                                <img className="ml-5" src="https://static.vecteezy.com/system/resources/previews/008/057/414/non_2x/assignment-line-icon-vector.jpg" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5  text-center" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', backgroundColor: "orange" }}>
                                <span className="">Pending Reviews</span><br />
                                <span>34</span>
                                <img className="ml-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPHiti9Fs_7BQ0yPl-cwSBxq-aC3_91FEvA&s" alt="" style={{ height: "20px" }} />
                            </div>
                        </div>

                    </div>
                    <div className="mt-5 p-2" style={{boxShadow:"0px 0px 3px 0px grey",maxHeight:"300px",overflowY:"auto"}}>
                    <div>
                        <div className="d-flex" >
                            <div style={{position:"sticky",top:0,  zIndex: 1,}}>
                                <h6>Recent Assignment</h6>
                            </div>
                            <div style={{marginLeft:"630px"}}>
                                <Link to="/create-assignment" className="btn btn-primary">+ Create assignment</Link>
                            </div>
                        </div>
                        <div>
                            {assignment?.map((task,index)=>{return  <div className="mt-3 p-1" style={{border:"0.1px solid grey"}}>
                           <p>Title : {task.title}</p>
                           <p>Description : {task.description}</p>
                           <p>Subject : {task.subject}</p>
                           <p>DeadLine : {task.deadline?.slice(0,10)}</p>
                           <p>{task.file}</p>
                        </div>})}
                       
                        </div>

                    </div>
                    </div>

                </div>
            </div>


        </div>
    </>
}
export default TeacherPortal