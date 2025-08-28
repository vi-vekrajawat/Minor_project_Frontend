export const BASE_URL = "https://assignmentmanagementproject.onrender.com"
// export const BASE_URL = "http://localhost:3000"
export default {
    STUDENT_LIST: BASE_URL+'/admin',
    USER_LOGIN: BASE_URL+'/admin/login',
    ALL_BATCHES: BASE_URL+'/batch',
    ADD_USER: BASE_URL+'/admin/insert-single',
    CREATE_BATCH: BASE_URL+'/batch/create-batch',
    ASSIGNMENT_CREATE: BASE_URL+"/teacher/create",
    GET_AAASIGNMENT: BASE_URL+"/teacher",
    SUBMISSION: BASE_URL+"/student",
    STUDENT_PROFILE: BASE_URL+'/admin/profile',
    STUDENT_FILE: BASE_URL+'/admin/insert-students',
    GET_AAASIGNMENT_Id: BASE_URL+"/teacher/submitted",
    DELTE_BATCH : BASE_URL+"/batch",
    GOOGLE_LOGIN : BASE_URL+"/admin/google-login",
    COUNT_ASSIGNMENT : BASE_URL+"/student/submission",
    SUBMMITED_ASSIGNMENT : BASE_URL+"/student",
    PROFILE_UPDATE:BASE_URL+"/admin/profile-data",
    ASSIGNMENT_TEACHER_BY_ID:BASE_URL+"/teacher/teacherId",
    SUBMIT_ASSIGNMENT_BYID:BASE_URL+"/student/submitted-assignments",
    UPDATE_TEACHER_BATCH:BASE_URL+"/admin//assign-teacher",
    DELETE_STUDENT:BASE_URL+"/admin/delete",
    DELETE_TEACHER:BASE_URL+"/admin/teacher",
    ASSIGN_BATCH:BASE_URL+"/admin/assign-batch"









}