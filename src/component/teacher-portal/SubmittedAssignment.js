import axios from "axios"
import { useEffect, useState } from "react"
import Backend from "../../apis/Backend"

function SubmittedAssignment(){
const [viewMore,setViewMore] = useState([3])
    const [task,setTask] = useState([])
    useEffect(()=>{
        loadsubmitAssignment()
    },[])

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
                    <div className="ml-3">Dashboard</div>
                    <div className="ml-3">Create Assignment</div>
                    <div className="ml-3">Profile</div>
                </div>


                <div className="d-flex" style={{ marginLeft: "700px" }}>
                    <div className="ml-3">imgage</div>
                    <div className="ml-3 ">TeacherName</div>
                </div>
            </div>
            </div>
     <div className="d-flex">

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width:"180px" }}>
                    <div className="mt-5">
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</div>
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Create Assignment</div>
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Profile</div>
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Submitted Assignment</div>

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

