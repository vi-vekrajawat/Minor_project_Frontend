import axios from "axios"
import { useEffect, useState } from "react"
import backend from "../../apis/Backend"
import { Link } from "react-router-dom"
import Backend from "../../apis/Backend"

function Admin() {

    const [studnet, setStudnet] = useState([])

    useEffect(() => {
        loadStudents()
    }, [])

    const loadStudents = async () => {
        const response = await axios.get(backend.STUDENT_LIST)
        console.log(response)
        setStudnet(response.data.allStudents)
        // console.log(response)
    }
    const [excelFile,setExcelFile] = useState([null])
    const uploadFile = async(event)=>{
        try{
            const response = await axios.post(Backend.STUDENT_FILE,excelFile)
            console.log(response)
        }
        catch(err){
            console.log(err)
        }

    }
    return <>
        <div>
            <div className="d-flex bg-primary text-white p-2">
                <div className="d-flex">
                    <div >ITEP</div>
                    <div className="ml-3">Dashboard</div>
                    <div className="ml-3">Batch Management</div>
                    <div className="ml-3">Profile</div>
                </div>


                <div className="d-flex" style={{ marginLeft: "700px" }}>
                    <div className="ml-3">imgage</div>
                    <div className="ml-3 ">TeacherName</div>
                </div>
            </div>
            <div className="d-flex">

                <div className="text-center" style={{ boxShadow: "0px 0px 3px 0px grey", height: "500px", width: "180px" }}>
                    <div className="mt-5">
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Dashboard</div>
                        <Link to='/batch-management' className="mt-5 mr-3 list-group-item list-group-item-action">Batch Management</Link>
                        <div className="mt-5 mr-3 list-group-item list-group-item-action">Profile</div>
                    </div>
                </div>
                <div className="ml-5">
                    <div>
                        <div>
                            <h2>Admin Dashboard</h2>
                            <p>Manage your educational platform</p>
                        </div>
                        <div className="d-flex ">
                            <div className="text-center bg-primary text-white " style={{ width: "200px", height: "60px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Total Batches</span><br />
                                <span >3</span>
                                <img className="ml-5" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7Av_WNQOfLg8elfZ-Zg2QHuPXRIEtMgoSQ-43jTOZRyTBAhKp" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center bg-success text-white" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey' }}>
                                <span>Total Students</span><br></br>
                                <span>{studnet.filter(user => user.role === 'student').length}</span>
                                <img className="ml-5" src="https://downloadr2.apkmirror.com/wp-content/uploads/2024/08/50/66c88e18416fc_com.android.contacts-384x384.png" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5 text-center" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', backgroundColor: "purple" }}>
                                <span>Total Teachers</span><br />
                                <span>{studnet.filter(user => user.role === 'teacher').length}</span>
                                <img className="ml-5" src="https://static.vecteezy.com/system/resources/previews/008/057/414/non_2x/assignment-line-icon-vector.jpg" alt="" style={{ height: "20px" }} />
                            </div>
                            <div className="ml-5  text-center" style={{ width: "200px", boxShadow: '0px 0px 3px 0px grey', backgroundColor: "orange" }}>
                                <span className="">Active Assignments</span><br />
                                <span>34</span>
                                <img className="ml-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPHiti9Fs_7BQ0yPl-cwSBxq-aC3_91FEvA&s" alt="" style={{ height: "20px" }} />
                            </div>
                        </div>

                    </div>
                    <div className="mt-5 p-2" style={{ boxShadow: "0px 0px 3px 0px grey" }}>
                        <div>
                            <div className="d-flex" >
                                <div>
                                    <h6>Recent Users</h6>
                                </div>
                                <div style={{ marginLeft: "630px" }}>
                                    <Link to="/add-student" className="btn btn-primary">+ Add Users</Link>
                                </div>
                                <div >
                                    <Link to="/excel-file" className="btn btn-primary">+ Upload File</Link>
                                </div>
                            </div>
                            <div>
                                <table className="table mt-1">
                                    <thead className="table-dark">
                                        <tr>
                                            <td>name</td>
                                            <td>Email</td>
                                            <td>Role</td>
                                            <td>Batch</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studnet.map((data, index) => {
                                            return <tr>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.role}</td>
                                                <td>{data.batch?.batchName}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </div>


        </div>
    </>
}
export default Admin