// // import axios from "axios"
// // import { useEffect, useState } from "react"
// // import Backend from "../../apis/Backend"

// // function CreateAssignmnet() {

// //     const [task,setTask] = useState({
// //         title:"",
// //         description:'',
// //         instructions:"",
// //         batchId:"",
// //         subject:"",
// //         deadline:"",
// //         file:"",
// //     })

// //     const SendAssignment = async(event)=>{
// //         try{
// //             event.preventDefault()
// //             console.log(task)
// //             const response = await axios.post(Backend.ASSIGNMENT_CREATE,task)
// //             console.log(response)


// //         }
// //         catch(err){
// //             console.log(err)
// //         }
// //     }

// // const [batch,setAllBatch] = useState([])

// //     useEffect(()=>{
// //         loadBatch()
// //     },[])

// //     const loadBatch = async()=>{
// //         try{
// //             const response = await axios.get(Backend.ALL_BATCHES)
// //             const batches = response.data.getAll
// //             setAllBatch(batches)

// //         }
// //         catch(err){
// //             console.log(err)
// //         }
// //     }
// //     return <>
// //         <div>
// //             <form className="form-group" onSubmit={SendAssignment}>
// //             <div>
// //                 <div className="form-group">
// //                     <div>
// //                         <input className="form-control" onChange={(event)=>setTask({...task,title:event.target.value})} type="text" placeholder="Assignment Title" name="" id="" />
// //                     </div>
// //                     <div>
// //                         <select onChange={(event)=>setTask({...task,subject:event.target.value})} value={task.subject} name="" id="" className="form-control">
// //                             <option value=" ">select subject</option>
// //                             <option value="technical">Technical</option>
// //                             <option value="softskill">softskill</option>
// //                             <option value="Aptitude">Aptitude</option>
// //                         </select>
// //                     </div>
// //                     <div>
// //                         <textarea onChange={(event)=>setTask({...task,description:event.target.value})} name="" placeholder="description"  className="form-group" id="" cols="20" rows="8"></textarea>
// //                     </div>
// //                     <div>
// //                         <textarea onChange={(event)=>setTask({...task,instructions:event.target.value})} name="" placeholder="instructions" id="" cols="30" className="form-control" rows="10"></textarea>
// //                     </div>
// //                     <div>
// //                         <select className="form-control" onChange={(event)=>setTask({...task,batch:event.target.value})} value={task.batch} name="" id="">
// //                           <option value="">Select Batch</option>
// //                           {batch.map((getbatch,index)=> {return <option value={getbatch._id} >{getbatch.batchName}</option>})}
// //                         </select>
// //                     </div>
// //                     <div>
// //                         <input onChange={(event)=>setTask({...task,deadline:event.target.value})}  className="form-control" type="date" placeholder="set Deadline" name="" id="" />
// //                     </div>
// //                     <div>
// //                         <input onChange={(event)=>setTask({...task,file:event.target.value})} className="form-control" type="file" placeholder="upload your file" name="" id="" />
// //                     </div>
// //                     <div>
// //                         <button className="btn btn-primary form-control">Create</button>
// //                     </div>
// //                 </div>
// //             </div>
// //             </form>
// //         </div>

// //     </>
// // }

// // export default CreateAssignmnet
// import axios from "axios"
// import { useEffect, useState } from "react"
// import Backend from "../../apis/Backend"

// function CreateAssignmnet() {

//     const [task, setTask] = useState({
//         title: "",
//         description: '',
//         instructions: "",
//         batchId: "", // batch ki jagah batchId use kar rahe hai
//         subject: "",
//         deadline: "",
//         file: "",
//     })

//     const [batch, setAllBatch] = useState([])
//     const [loading, setLoading] = useState(false)

//     const SendAssignment = async (event) => {
//         try {
//             event.preventDefault()
//             setLoading(true)

//             // Validation check karte hai
//             if (!task.title.trim()) {
//                 alert("Assignment title required hai")
//                 setLoading(false)
//                 return
//             }

//             if (!task.batchId || task.batchId === "") {
//                 alert("Please select a batch")
//                 setLoading(false)
//                 return
//             }

//             if (!task.subject) {
//                 alert("Please select subject")
//                 setLoading(false)
//                 return
//             }

//             // Data prepare karte hai
//             const assignmentData = {
//                 title: task.title,
//                 batchId: task.batchId, // Correct field name
//                 description: task.description,
//                 instructions: task.instructions,
//                 subject: task.subject,
//                 deadline: task.deadline,
//                 file: task.file
//             }

//             console.log("Sending assignment data:", assignmentData)
//             const response = await axios.post(Backend.ASSIGNMENT_CREATE, assignmentData)
//             console.log("Response:", response.data)

//             if (response.data.message) {
//                 alert(response.data.message)
//                 // Form reset kar dete hai success ke baad
//                 setTask({
//                     title: "",
//                     description: '',
//                     instructions: "",
//                     batchId: "",
//                     subject: "",
//                     deadline: "",
//                     file: "",
//                 })
//             }

//         }
//         catch (err) {
//             console.log("Error:", err)
//             if (err.response && err.response.data && err.response.data.message) {
//                 alert(err.response.data.message)
//             } else {
//                 alert("Something went wrong")
//             }
//         }
//         finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         loadBatch()
//     }, [])

//     const loadBatch = async () => {
//         try {
//             const response = await axios.get(Backend.ALL_BATCHES)
//             console.log("Batches response:", response.data)
            
//             // Response structure check karte hai
//             const batches = response.data.getAll || response.data.batches || response.data
//             setAllBatch(batches)

//         }
//         catch (err) {
//             console.log("Error loading batches:", err)
//         }
//     }

//     return <>
//         <div>
//             <h2>Create Assignment</h2>
//             <form className="form-group" onSubmit={SendAssignment}>
//                 <div>
//                     <div className="form-group">
//                         <div>
//                             <input 
//                                 className="form-control" 
//                                 onChange={(event) => setTask({...task, title: event.target.value})} 
//                                 value={task.title}
//                                 type="text" 
//                                 placeholder="Assignment Title *" 
//                                 required
//                             />
//                         </div>
                        
//                         <div>
//                             <select 
//                                 onChange={(event) => setTask({...task, subject: event.target.value})} 
//                                 value={task.subject} 
//                                 className="form-control"
//                                 required
//                             >
//                                 <option value="">Select Subject *</option>
//                                 <option value="technical">Technical</option>
//                                 <option value="softskil">Soft Skill</option>
//                                 <option value="aptitude">Aptitude</option>
//                             </select>
//                         </div>

//                         <div>
//                             <select 
//                                 className="form-control" 
//                                 onChange={(event) => setTask({...task, batchId: event.target.value})} 
//                                 value={task.batchId}
//                                 required
//                             >
//                                 <option value="">Select Batch *</option>
//                                 {batch && batch.length > 0 ? (
//                                     batch.map((getBatch, index) => {
//                                         return (
//                                             <option key={getBatch._id || index} value={getBatch._id}>
//                                                 {getBatch.batchName}
//                                             </option>
//                                         )
//                                     })
//                                 ) : (
//                                     <option value="">No batches available</option>
//                                 )}
//                             </select>
//                         </div>
                        
//                         <div>
//                             <textarea 
//                                 onChange={(event) => setTask({...task, description: event.target.value})} 
//                                 value={task.description}
//                                 placeholder="Description" 
//                                 className="form-control" 
//                                 cols="20" 
//                                 rows="4"
//                             ></textarea>
//                         </div>
                        
//                         <div>
//                             <textarea 
//                                 onChange={(event) => setTask({...task, instructions: event.target.value})} 
//                                 value={task.instructions}
//                                 placeholder="Instructions" 
//                                 className="form-control" 
//                                 cols="30" 
//                                 rows="6"
//                             ></textarea>
//                         </div>
                        
//                         <div>
//                             <input 
//                                 onChange={(event) => setTask({...task, deadline: event.target.value})} 
//                                 value={task.deadline}
//                                 className="form-control" 
//                                 type="date" 
//                                 placeholder="Set Deadline"
//                             />
//                         </div>
                        
//                         <div>
//                             <input 
//                                 onChange={(event) => setTask({...task, file: event.target.value})} 
//                                 className="form-control" 
//                                 type="file" 
//                                 placeholder="Upload your file"
//                             />
//                         </div>
                        
//                         <div>
//                             <button 
//                                 type="submit" 
//                                 className="btn btn-primary form-control"
//                                 disabled={loading}
//                             >
//                                 {loading ? "Creating..." : "Create Assignment"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </form>

//             {/* Debug info */}
//             <div style={{marginTop: "20px", fontSize: "12px", color: "#666"}}>
//                 <strong>Debug Info:</strong>
//                 <br/>Batches loaded: {batch.length}
//                 <br/>Selected batch: {task.batchId}
//                 <br/>Title: {task.title}
//                 <br/>Subject: {task.subject}
//             </div>
//         </div>
//     </>
// }

// export default CreateAssignmnet
import axios from "axios";
import { useEffect, useState } from "react";
import Backend from "../../apis/Backend";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Toast } from "bootstrap";

function CreateAssignmnet() {
  const [task, setTask] = useState({
    title: "",
    description: '',
    instructions: "",
    batchId: "",
    subject: "",
    deadline: "",
    file: "",
  });

  const user = JSON.parse(sessionStorage.getItem("current-user"))

  const [batch, setAllBatch] = useState([]);
  const [loading, setLoading] = useState(false);

  const SendAssignment = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!task.title.trim()) {
        toast.error("Assignment title required ");
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

      const assignmentData = {
        title: task.title,
        batchId: task.batchId,
        description: task.description,
        instructions: task.instructions,
        subject: task.subject,
        deadline: task.deadline,
        file: task.file,
      };

      const response = await axios.post(Backend.ASSIGNMENT_CREATE, assignmentData);
      if (response.data.message) {
        toast.success(response.data.message);
        setTask({
          title: "",
          description: '',
          instructions: "",
          batchId: "",
          subject: "",
          deadline: "",
          file: "",
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.success(err.response?.data?.message || "Something went wrong");
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

  return <>
      <ToastContainer></ToastContainer>
     <div>
            <div className="d-flex bg-primary text-white p-2">
                <div className="d-flex">
                    <div >ITEP</div>
                    <Link to="/teacher-portal"  style={{textDecoration: "none",color: "inherit"}} className="ml-3">Dashboard</Link>
                   <div> <Link  style={{textDecoration: "none",color: "inherit"}}  className="ml-3">Create Assignment</Link></div>
                    <Link to="/teacher-profile"  style={{textDecoration: "none",color: "inherit"}}  className="ml-3">Profile</Link>
                </div>


                  <div className="d-flex" style={{ marginLeft: "820px" }}>
                    <div className="ml-3">
                        <img
                            src={`http://localhost:3000/uploads/profile/${user.profile}`}
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
                        <Link to="/teacher-portal" className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</Link>
                        <Link to="/create-assignment" className="mt-5 mr-3 list-group-item list-group-item-action">Create Assignment</Link>
                        <Link to="/teacher-profile" className="mt-5 mr-3 list-group-item list-group-item-action">Profile</Link>
                        <Link to="/submitted" className="mt-5 mr-3 list-group-item list-group-item-action">Submitted Assignment</Link>

                    </div>
                </div>
    <div className="d-flex justify-content-center mt-2 " style={{marginLeft:"300px"}}>
      <div className="shadow p-2 rounded bg-white w-100" style={{ maxWidth: "800px" }}>
        <h3 className="text-center mb-4 text-primary">Create New Assignment</h3>
        <form onSubmit={SendAssignment}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Assignment Title *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select Batch *</label>
                <select
                  className="form-control"
                  value={task.batchId}
                  onChange={(e) => setTask({ ...task, batchId: e.target.value })}
                  required
                >
                  <option value="">Choose batch</option>
                  {batch.length > 0 ? (
                    batch.map((getBatch, index) => (
                      <option key={getBatch._id || index} value={getBatch._id}>
                        {getBatch.batchName}
                      </option>
                    ))
                  ) : (
                    <option disabled>No batches available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Select Subject *</label>
                <select
                  className="form-control"
                  value={task.subject}
                  onChange={(e) => setTask({ ...task, subject: e.target.value })}
                  required
                >
                  <option value="">Choose subject</option>
                  <option value="technical">Technical</option>
                  <option value="softskil">Soft Skill</option>
                  <option value="aptitude">Aptitude</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  className="form-control"
                  value={task.deadline}
                  onChange={(e) => setTask({ ...task, deadline: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Full-width fields */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Instructions</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter instructions"
              value={task.instructions}
              onChange={(e) => setTask({ ...task, instructions: e.target.value })}
            ></textarea>
          </div>

          <div className="mb-4 ">
            <label className="form-label">Upload File (Optional)</label>
            <input
              type="file"
              className="form-control " style={{borderStyle:"none"}}
              onChange={(e) => setTask({ ...task, file: e.target.value })}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  </>

}

export default CreateAssignmnet;
