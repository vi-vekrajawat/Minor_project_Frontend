import axios from "axios"
import { useEffect, useState } from "react"
import Backend, { BASE_URL } from "../../apis/Backend"
import { Link } from "react-router-dom"

function SubmittedAssignment(){
const [viewMore,setViewMore] = useState([3])
    const [task,setTask] = useState([])
    useEffect(()=>{
        loadsubmitAssignment()
    },[])

    const user = JSON.parse(sessionStorage.getItem("current-user"))

    const loadsubmitAssignment = async() =>{
        try{
            const response = await axios.get(Backend.SUBMISSION)
            console.log(response)
            setTask(response.data.allass)
        }
        catch(err){
            console.log(err)
        }
    }
    const viewMoreTask = ()=>{
        setViewMore((prev)=>prev+3)
    }
    return<>
  <div>
            <div className="d-flex bg-primary text-white p-2">
                <div className="d-flex">
                    <div >ITEP</div>
                    <Link to="/teacher-portal" style={{textDecoration: "none",color: "inherit"}}   className="ml-3">Dashboard</Link>
                    <Link to="/create-assignment" style={{textDecoration: "none",color: "inherit"}}  className="ml-3">Create Assignment</Link>
                    <Link to="/profile" style={{textDecoration: "none",color: "inherit"}}  className="ml-3">Profile</Link>
                </div>


                      <div className="d-flex" style={{ marginLeft: "820px" }}>
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
            </div>
     <div className="d-flex">

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width:"180px" }}>
                    <div className="mt-5">
                        <Link to="/teacher-portal" style={{textDecoration: "none",color: "inherit"}}  className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</Link>
                        <Link  to="/create-assignment" className="mt-5 mr-3 list-group-item list-group-item-action">Create Assignment</Link>
                        <Link to="/teacher-profile" style={{textDecoration: "none",color: "inherit"}}  className="mt-5 mr-3 list-group-item list-group-item-action">Profile</Link>
                        <Link  style={{textDecoration: "none",color: "inherit"}}  className="mt-5 mr-3 list-group-item list-group-item-action">Submitted Assignment</Link>

                    </div>
                </div>
             

    <div className="container" >
        <div>
            <div className="bg-info text-white mt-3 p-2 ml-5" style={{boxShadow:"0px 0px 2px 0px grey",height:"140px"}}>
                <div>Total Assignment</div>
                <div className="text-center">({task.length})</div>
               
            </div>
        </div>
        <div  >
            {task.slice(0,viewMore).map((data,index)=>{return  <div className="bg-secondary ml-5 text-white mt-3 p-2"  >
                <small>FeedBack : {data.feedback}</small><br/>
                <small >Description : {data.description}</small><br />
                <small className="bg-info">Submitted</small>
            </div>})}

            {viewMore<task.length&&(
                <button className="ml-5 btn-white " style={{borderStyle:'none'}} onClick={viewMoreTask}>View More</button>
            )}
            
        </div>
    </div>
       </div>
    </>
}

export default SubmittedAssignment

