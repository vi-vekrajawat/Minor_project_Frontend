import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./BatchManage.css"
import axios from "axios";
import Backend from "../../apis/Backend";
function BatchManage() {
  const [getBatch, setGetBatch] = useState([])
  const [total, setTotal] = useState(0)
  const [tchr, settchr] = useState(0)
  useEffect(() => {
    allBatches();
  }, [])

  const allBatches = async () => {
    try {
      const response = await axios.get(Backend.ALL_BATCHES)
      const batches = response.data.getAll
      setGetBatch(batches)
      const count = batches.reduce((acc, batch) => acc + (batch.students?.length), 0)
      const tchrcount = batches.reduce((acc, batch) => acc + (batch.teachers?.length), 0)
      setTotal(count)
      settchr(tchrcount)
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
  }
  return <>
    <div class="container" id="div1">
      <aside class="sidebar">
        <h2>EduAssign</h2>
        <ul>
          <Link to="/admin"
            style={{textDecoration: "none",color: "inherit"}} ><li>📊 Dashboard</li></Link>
          <li>📚 Batch Management</li>
        <Link to="/admin-profile"  style={{textDecoration: "none",color: "inherit"}}>👤 Profile</Link>
        </ul>
      </aside>

      <main class="main-content">
        <header class="top-bar">
          <nav>
            <span>Dashboard</span>
            <span>Batch Management</span>
            <span>Profile</span>
          </nav>
          <div class="admin-profile">👤 Admin User</div>
        </header>

        <section class="page-header">
          <h1>Batch Management</h1>
          <p>Manage student batches and teacher assignments</p>
        </section>

        <section class="summary-cards">
          <div class="card blue">Total Batches <span>{getBatch.length}</span></div>
          <div class="card green">Active Batches <span>{getBatch.length}</span></div>
          <div class="card purple" id="showstd">Total Students <span>{total}</span></div>
          <div class="card orange">Available Teachers <span>{tchr}</span></div>
        </section>

        <section class="actions">
          <Link to='/create-batch' class="btn blue" id="batch-create" >+ Create Batch</Link>
        </section>

        <section class="batches" style={{ overflowY: "auto", maxHeight: "370px" }}>
          {getBatch.map((element, index) => {
            return <div key={index} id="divbatch" class="batch-card">
              <p><b>{element.batchName}</b></p>
              <p>Launch Date : {element.launchDate?.slice(0, 10)}</p>
              <p>Expire Date : {element.expireDate?.slice(0, 10)}</p>
              <p id="std">Total Students :  {element.students.length}</p>
              <p id="teacher">Total Teachers : {element.teachers.length}</p>
            </div>

          })}




        </section>
      </main>
    </div>


  </>
}

export default BatchManage