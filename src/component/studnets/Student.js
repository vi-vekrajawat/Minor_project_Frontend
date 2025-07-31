import { createContext, useEffect, useState } from "react"
import axios from "axios"
import Backend, { BASE_URL } from "../../apis/Backend.js";
import { Link } from "react-router-dom";
function Student({ }) {
    const user = JSON.parse(sessionStorage.getItem("current-user"))
    const [task, setTask] = useState([])

const overdueCount = task.filter(a => new Date(a.deadline) < new Date()).length;

    useEffect(() => {
        loadAssignmnets()
    }, [])

    const loadAssignmnets = async () => {
        try {
            const response = await axios.get(Backend.GET_AAASIGNMENT)
            const tasks = response.data.assignment
            setTask(tasks)
            console.log(response)
        }
        catch (err) {
            console.log(err)
        }
    }

    return <>

        <div>
            <div className="d-flex bg-primary text-white p-2">
                <div className="d-flex">
                    <div >ITEP</div>
                    <Link  className="ml-3 ">Dashboard</Link>
                    <Link to="submission" className="ml-3 ">My Assignment</Link>
                    <Link to="student-profile" className="ml-3 ">Profile</Link>
                </div>


                <div className="d-flex" style={{ marginLeft: "700px" }}>
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

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width: "180px" }}>
                    <div className="mt-5">
                        <Link  className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</Link>
                        <Link to="/submission" className="mt-5 mr-3 list-group-item list-group-item-action">My Assignment</Link>
                        <Link to="/student-profile" className="mt-5 mr-3 list-group-item list-group-item-action">Profile</Link>
                    </div>
                </div>
                <div className="ml-5">
                    <div>
                        <div>
                            <h2>Student Dashboard</h2>
                            <p>Manage your classes and assignments</p>
                        </div>
                        <div className="d-flex ">
                            <div className="text-center bg-primary text-white " style={{ width: "200px", height: "60px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Total Assignment</span><br />
                                <span >{task.length}</span>
                                <img className="ml-5" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7Av_WNQOfLg8elfZ-Zg2QHuPXRIEtMgoSQ-43jTOZRyTBAhKp" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center bg-success text-white" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Submiting</span><br></br>
                                <span>4</span>
                                <img className="ml-5" src="https://downloadr2.apkmirror.com/wp-content/uploads/2024/08/50/66c88e18416fc_com.android.contacts-384x384.png" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center text-white" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
                                <span>Pending</span><br />
                                <span>5</span>
                                <img className="ml-5" src="https://static.vecteezy.com/system/resources/previews/008/057/414/non_2x/assignment-line-icon-vector.jpg" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5  text-center" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', backgroundColor: "orange" }}>
                                <span className="">Overdue</span><br />
                                <span>{overdueCount}</span>
                                <img className="ml-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPHiti9Fs_7BQ0yPl-cwSBxq-aC3_91FEvA&s" alt="" style={{ height: "20px" }} />
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 p-2" style={{ boxShadow: "0px 0px 3px 0px grey", maxHeight: "350px", overflowY: "auto" }}>
                        <div>
                            <h6 style={{
                                position: "sticky",
                                top: 0,
                                backgroundColor: "#fff",
                                padding: "10px",
                                zIndex: 1,
                                borderBottom: "1px solid #ccc"
                            }}>Assignments</h6>

                            <div className="mt-3">

                                {task.map((data, index) => {
                                    return <div key={index} className="mt-3 p-1" style={{ border: "0.1px solid grey" }}>
                                        <small><b>Title :</b> {data.title}</small>
                                        <small style={{ color: "orange", marginLeft: "800px" }}>active</small><br />
                                        <small><b>Subject :</b> {data.subject}</small><br />
                                        <small><b>DeadLine :</b> {data.deadline?.slice(0,10)}</small><br />

                                        {data?.file && (
                                            <small>
                                                <b>File:</b>{" "}
                                                <a href={`${BASE_URL}/assignment/files/${data.file}`}
                                                    download target="_blank" rel="noopener noreferrer"style={{ textDecoration: "none", color: "#007bff" }}><i className="fa fa-download" style={{ marginRight: "5px" }}></i>Download File</a></small>)}<br />

                                        <button className="btn btn-success">Submit</button>
                                        <button className="btn btn-primary">view</button>
                                    </div>
                                })}




                            </div>



                        </div>
                    </div>

                </div>
            </div>


        </div>
    </>


}

export default Student