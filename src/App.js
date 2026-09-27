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
import WorkspaceShell from "./component/shared/WorkspaceShell";

const inWorkspace = (page) => <WorkspaceShell><Auth>{page}</Auth></WorkspaceShell>;

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
            <Route path="/batch-management" element={inWorkspace(<BatchManage />)} />
            <Route path="/add-student" element={inWorkspace(<AddStudent />)} />
            <Route path="/create-batch" element={inWorkspace(<CreateBatch />)} />
            <Route path="/create-assignment" element={inWorkspace(<CreateAssignmnet />)} />
            <Route path="/submitted" element={inWorkspace(<SubmittedAssignment />)} />
            <Route path="/student-profile" element={inWorkspace(<StudentProfile />)} />
            <Route path="/excel-file" element={inWorkspace(<ExcelFileUpload />)} />
            <Route path="/admin-profile" element={inWorkspace(<AdminProfile />)} />
            <Route path="/teacher-profile" element={inWorkspace(<TeacherProfile />)} />
            <Route path="/create-notice/:id" element={inWorkspace(<NoticeCreate />)} />

            <Route path="/teacher-portal" element={inWorkspace(<TeacherPortal />)} />
            <Route path="/student" element={inWorkspace(<Student />)} />
            <Route path="/admin" element={inWorkspace(<Admin />)} />
            <Route path="/submission" element={inWorkspace(<SubmitAssignment />)} />
          </Routes>
        </BatchProvider>
      </AssignmentProvider>
    </BrowserRouter>
  );
}

export default App;
