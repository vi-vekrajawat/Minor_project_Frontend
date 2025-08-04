
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Backend, { BASE_URL } from "../../apis/Backend.js";
import { Link } from "react-router-dom";
import { AssignmentContext } from "../../context/AssignmentProvider.js";

function Student() {
  const user = JSON.parse(sessionStorage.getItem("current-user"));
  const {task} = useContext(AssignmentContext)

  const overdueCount = task.filter(a => new Date(a.deadline) < new Date()).length;
  const filteredTasks = task.filter(t => t.batchId === user.batch);
  return (
    <div style={{ width: "100vw", minHeight: "100vh", overflowX: "hidden", backgroundColor: "#f8f9fa" }}>
      
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center bg-primary text-white p-3 flex-wrap">
        <div className="d-flex flex-wrap">
          <div className="mr-3 font-weight-bold">ITEP</div>
          <Link to="/student-dashboard" className="text-white mr-3" style={{ textDecoration: "none" }}>Dashboard</Link>
          <Link to="/submission" className="text-white mr-3" style={{ textDecoration: "none" }}>My Assignment</Link>
          <Link to="/student-profile" className="text-white" style={{ textDecoration: "none" }}>Profile</Link>
        </div>
        <div className="d-flex mt-2 mt-md-0">
          <img
            src={`${BASE_URL}/uploads/profile/${user.profile}`}
            alt="Profile"
            style={{ height: "40px", width: "40px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span className="ml-2">{user.name}</span>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="d-flex flex-column flex-md-row" style={{ width: "100vw", minHeight: "calc(100vh - 60px)" }}>
        
        {/* Sidebar */}
        <div
          className="text-center bg-white"
          style={{
            width: "200px",
            boxShadow: "0px 0px 3px grey",
            flexShrink: 0
          }}
        >
          <div className="mt-5">
            <Link to="/student-dashboard" className="list-group-item list-group-item-action mt-3">Dashboard</Link>
            <Link to="/submission" className="list-group-item list-group-item-action mt-3">My Assignment</Link>
            <Link to="/student-profile" className="list-group-item list-group-item-action mt-3">Profile</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2>Student Dashboard</h2>
          <p>Manage your classes and assignments</p>

          {/* Summary Cards */}
          <div className="row">
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-primary text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Total Assignment</span><br />
                <h4>{task.length}</h4>
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR7Av_WNQOfLg8elfZ-Zg2QHuPXRIEtMgoSQ-43jTOZRyTBAhKp" alt="" style={{ height: "20px" }} />
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center bg-success text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey" }}>
                <span>Submitting</span><br />
                <h4>4</h4>
                <img src="https://downloadr2.apkmirror.com/wp-content/uploads/2024/08/50/66c88e18416fc_com.android.contacts-384x384.png" alt="" style={{ height: "20px" }} />
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}>
                <span>Pending</span><br />
                <h4>5</h4>
                <img src="https://static.vecteezy.com/system/resources/previews/008/057/414/non_2x/assignment-line-icon-vector.jpg" alt="" style={{ height: "20px" }} />
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="text-center text-white p-3 rounded" style={{ boxShadow: "0px 0px 3px grey", backgroundColor: "orange" }}>
                <span>Overdue</span><br />
                <h4>{overdueCount}</h4>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFPHiti9Fs_7BQ0yPl-cwSBxq-aC3_91FEvA&s" alt="" style={{ height: "20px" }} />
              </div>
            </div>
          </div>

          {/* Assignment List */}
          <div className="mt-3 p-3 bg-white rounded" style={{ boxShadow: "0px 0px 3px grey", maxHeight: "350px", overflowY: "auto" }}>
            <h6 className="border-bottom pb-2">Assignments</h6>
            {filteredTasks?.map((data, index) => (
              <div key={index} className="mt-3 p-2 border rounded">
                <small><b>Title:</b> {data.title}</small>
                <small className="float-right text-warning">Active</small><br />
                <small><b>Subject:</b> {data.subject}</small><br />
                <small><b>Deadline:</b> {data.deadline?.slice(0, 10)}</small><br />

                {data?.file && (
                  <small>
                    <b>File:</b>{" "}
                    <a
                      href={`${BASE_URL}/assignment/files/${data.file}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#007bff" }}
                    >
                      <i className="fa fa-download mr-1"></i>Download File
                    </a>
                  </small>
                )}
                <div className="mt-2">
                  <Link to="/submission" className="btn btn-success btn-sm mr-2">Submit</Link>
                  <Link className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
