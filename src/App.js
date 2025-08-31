import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import SignIn from "./component/sign-in/SignIn";
import TeacherPortal from "./component/teacher-portal/TeacherPortal";
import Student from "./component/studnets/Student";
import Admin from "./component/admin/Admin";
import BatchManage from "./component/batch-management/BatchManage";
import StudentProfile from "./component/studnets/StudentProfile";
import AddStudent from "./component/studnets/AddStudent";
import CreateBatch from "./component/batch-management/CreateBatch";
import CreateAssignmnet from "./component/teacher-portal/CreateAssignmnet";
import SubmitAssignment from "./component/studnets/SubmitAssignment";
import AssignmentProvider from "./context/AssignmentProvider";
import Auth from "./component/auth/Auth";
import SubmittedAssignment from "./component/teacher-portal/SubmittedAssignment";
import ExcelFileUpload from "./component/admin/ExeclFileUpload";
import AdminProfile from "./component/admin/AdminProfile";
import TeacherProfile from "./component/teacher-portal/TeacherProfile";
import BatchProvider from "./context/BatchProvider";
import { useDispatch } from "react-redux";
import axios from "axios";
import Backend from "./apis/Backend";
import { setNotice } from "./component/redux/NoticeSlice";
import NoticeCreate from "./component/admin/NoticeCreate";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    loadNotice();
  },[])
  const loadNotice = async()=>{
    try{
      let response = await axios.get(Backend.FETCH_EVENT)
      dispatch(setNotice(response.data.notices))

    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <BrowserRouter>
      <AssignmentProvider>
        <BatchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/batch-management" element={<Auth><BatchManage /></Auth>} />
            <Route path="/add-student" element={<Auth><AddStudent /></Auth>} />
            <Route path="/create-batch" element={<Auth><CreateBatch /></Auth>} />
            <Route path="/create-assignment" element={<Auth><CreateAssignmnet /></Auth>} />
            <Route path="/submitted" element={<SubmittedAssignment />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/excel-file" element={<Auth><ExcelFileUpload /></Auth>} />
            <Route path="/admin-profile" element={<Auth><AdminProfile /></Auth>} />
            <Route path="/teacher-profile" element={<Auth><TeacherProfile /></Auth>} />
            <Route path="/create-notice/:id" element={<Auth><NoticeCreate></NoticeCreate></Auth>}></Route>

            <Route path="/teacher-portal"element={<Auth><TeacherPortal /></Auth>}/>
            <Route path="/student"element={<Auth><Student /></Auth>}/>
            <Route path="/admin" element={<Auth><Admin /></Auth>}/>
            <Route path="/submission"element={<Auth><SubmitAssignment /></Auth>}/>
          </Routes>
        </BatchProvider>
      </AssignmentProvider>
    </BrowserRouter>
  );
}

export default App;
