import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BatchManage.css";
import axios from "axios";
import Backend from "../../apis/Backend";
import { button } from "framer-motion/client";
import { BatchContext } from "../../context/BatchProvider";

function BatchManage() {
  const { batchState } = useContext(BatchContext)
  const totalStudent = batchState.reduce((acc, batch) => acc + (batch.students?.length), 0);
  const totalTeacher = batchState.reduce((acc, batch) => acc + (batch.teachers?.length), 0);

  const deleteBatch = async (id) => {
    try {
      const response = await axios.delete(`${Backend.DELTE_BATCH}/${id}`)
      console.log(response)
      alert("Batch Deleted Successfully")
    }
    catch (err) {
      console.log('something is error')
      alert("Something is error")
    }
  }
  return (
    <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f8f9fa", overflowX: "hidden" }}>
      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "100vh" }}>
        <aside
          className="bg-white"
          style={{
            boxShadow: "0px 0px 3px grey",
            width: "100%",
            maxWidth: "220px",
            padding: "20px",
          }}
        >
          <h2>EduAssign</h2>
          <ul className="list-unstyled mt-4">
            <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
              <li className="mb-3">📊 Dashboard</li>
            </Link>
            <li className="mb-3">📚 Batch Management</li>
            <Link to="/admin-profile" style={{ textDecoration: "none", color: "inherit" }}>
              <li className="mb-3">👤 Profile</li>
            </Link>
          </ul>
        </aside>
        <main className="flex-grow-1 p-3">
          <header
            className="d-flex justify-content-between align-items-center bg-primary text-white p-2 flex-wrap"
            style={{ width: "100%" }}
          >
            <nav className="d-flex flex-wrap">
              <span className="mr-3">Dashboard</span>
              <span className="mr-3">Batch Management</span>
              <span className="mr-3">Profile</span>
            </nav>
            <div className="admin-profile">👤 Admin User</div>
          </header>
          <section className="mt-4">
            <h1>Batch Management</h1>
            <p>Manage student batches and teacher assignments</p>
          </section>
          <section className="d-flex flex-wrap mt-3">
            <div className="card text-white text-center p-3 m-2" style={{ backgroundColor: "#007bff", flex: "1 1 200px" }}>
              Total Batches <span>{batchState.length}</span>
            </div>
            <div className="card text-white text-center p-3 m-2" style={{ backgroundColor: "#28a745", flex: "1 1 200px" }}>
              Active Batches <span>{batchState.length}</span>
            </div>
            <div className="card text-white text-center p-3 m-2" style={{ backgroundColor: "#6f42c1", flex: "1 1 200px" }}>
              Total Students <span>{totalStudent}</span>
            </div>
            <div className="card text-white text-center p-3 m-2" style={{ backgroundColor: "#fd7e14", flex: "1 1 200px" }}>
              Available Teachers <span>{totalTeacher}</span>
            </div>
          </section>
          <section className="mt-3">
            <Link to="/create-batch" className="btn btn-primary">
              + Create Batch
            </Link>
          </section>
          <section className="mt-4" style={{ overflowY: "auto", maxHeight: "370px" }}>
            {batchState.map((element, index) => (
              <div
                key={index}
                className="p-3 m-2 bg-white position-relative"
                style={{ boxShadow: "0px 0px 3px grey", borderRadius: "5px" }}
              >
                <button

                  className="btn btn-danger btn-sm position-absolute"
                  style={{ top: "5px", right: "5px" }} onClick={() => deleteBatch(element._id)}

                >
                  Delete
                </button>

                <p><b>{element.batchName}</b></p>
                <p>Launch Date: {element.launchDate?.slice(0, 10)}</p>
                <p>Expire Date: {element.expireDate?.slice(0, 10)}</p>
                <p>Total Students: {element.students?.length || 0}</p>
                <p>Total Teachers: {element.teachers?.length || 0}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default BatchManage;
