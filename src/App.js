import React from "react"
// import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./component/home/Home"
import SignIn from "./component/sign-in/SignIn"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import TeacherPortal from "./component/teacher-portal/TeacherPortal"
import Student, { AssignmentContext } from "./component/studnets/Student"
import Admin from "./component/admin/Admin"
import BatchManage from "./component/batch-management/BatchManage"
import StudentProfile from "./component/studnets/StudentProfile"
import AddStudent from "./component/studnets/AddStudent"
import CreateBatch from "./component/batch-management/CreateBatch"
import CreateAssignmnet from "./component/teacher-portal/CreateAssignmnet"
import SubmitAssignment from "./component/studnets/SubmitAssignment"
import AssignmentProvider from "./context/AssignmentProvider"
import Auth from "./component/auth/Auth"
import SubmittedAssignment from "./component/teacher-portal/SubmittedAssignment"
import ExcelFileUpload from "./component/admin/ExeclFileUpload"
import AdminProfile from "./component/admin/AdminProfile"
import TeacherProfile from "./component/teacher-portal/TeacherProfile"
function App() {
  return <>


    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/teacher-portal" element={<Auth><TeacherPortal /></Auth>}> </Route>
        <Route path="/student" element={ <Auth><Student /></Auth>} />
        <Route path="/admin" element={<Auth><Admin/></Auth>} />
        <Route path="/batch-management" element={<BatchManage/>} />
        {/* <Route path="/admin-profile" element={<StudentProfile />} /> */}
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/create-batch" element={<CreateBatch />} />
        <Route path="/create-assignment" element={<CreateAssignmnet />} />
        <Route path="/submission" element={<AssignmentProvider><SubmitAssignment /></AssignmentProvider>}/>
        <Route path="/submitted" element={<SubmittedAssignment/>}/>
        <Route path="/student-profile" element={<StudentProfile/>}/>
        <Route path="/excel-file" element={<ExcelFileUpload/>}/>
        <Route path="/admin-profile" element={<AdminProfile/>}/>
        <Route path="/teacher-profile" element={<TeacherProfile/>}/>

      </Routes>
    </BrowserRouter>
    {/* <AdminProfile/> */}
  </>
}

export default App