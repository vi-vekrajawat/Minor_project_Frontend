
import axios from "axios";
import { useState } from "react";
import Backend from "../../apis/Backend";
import { useNavigate,Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../sign-in/firebase";
import "../sign-in/SignIn.css"

function SignIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [showForgotPassword,setShowForgotPassword] = useState(false);
  const [newpassword,setNewPassword] = useState({
    email:"",
    password:""
  });
  const [forgotError,setForgotError] = useState(""); // new error state for forgot password

  const validateForm = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!state.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }

    if (!state.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(Backend.USER_LOGIN, state);
      sessionStorage.setItem("current-user", JSON.stringify(response.data.findUser));
      toast.success("Sign In Successfully");
      redirectUser(response.data.userRole);
    } catch (err) {
      toast.error("Wrong credentials");
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const response = await axios.post(Backend.GOOGLE_LOGIN, { email: user.email });
      const chk = response.data.findUser;
      sessionStorage.setItem("current-user", JSON.stringify(chk));

      if (chk.role === "student") navigate("/student");
      else if (chk.role === "admin") navigate("/admin");
      else if (chk.role === "teacher") navigate("/teacher-portal");

      toast.success("Signed in with Google");
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In Failed");
    }
  };
  
  const handleChangePassword = async(event) =>{
    event.preventDefault();

    // check password length here
    if(newpassword.password.length <= 4){
      setForgotError("Password must be greater than 4 characters got it");
      return;
    } else {
      setForgotError("");
    }

    try{
      let response = await axios.post(`${Backend.CHANGE_PASSWORD}`,newpassword);
      console.log(response);
      alert("password change successfully");
      setShowForgotPassword(false);
      setNewPassword({
        email:"",
        password:""
      });

    }
    catch(err){
      setForgotError("Something went wrong, please try again.");
      console.log(err);
    }
  }

  const redirectUser = (role) => {
    if (role === "teacher") setTimeout(() => navigate("/teacher-portal"), 900);
    else if (role === "admin") setTimeout(() => navigate("/admin"), 900);
    else setTimeout(() => navigate("/student"), 900);
  };

  return (
    <>
      <ToastContainer />
      
      <div className="d-flex justify-content-center align-items-center main-div">
        <div className="p-4 rounded shadow main-div-second">
        
        {showForgotPassword && (
          <div style={{
            position: "fixed",
            top: -110,
            right:-430,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <div className="bg-white p-4 rounded shadow" style={{width:"450px"}}>
              <form onSubmit={handleChangePassword}>
                <h4>Change Password</h4>
                <input 
                  className="form-control my-2" 
                  type="text" 
                  placeholder="Enter Email"
                  value={newpassword.email}
                  onChange={(e)=>setNewPassword({...newpassword,email:e.target.value})}
                />
                <input 
                  className="form-control my-2" 
                  type="password" 
                  placeholder="New Password"
                  value={newpassword.password}
                  onChange={(e)=>setNewPassword({...newpassword,password:e.target.value})}
                />
                {/* show error below password */}
                {forgotError && <small className="text-danger">{forgotError}</small>}

                <button className="btn btn-primary w-100 mt-3">Change Password</button>
                <button 
                  type="button" 
                  className="btn btn-secondary w-100 mt-2" 
                  onClick={()=>setShowForgotPassword(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

          <h2 className="text-center mb-4 fw-bold text-white">ITEP-Assignment</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""}`}
                type="email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Enter Your Email"
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-3">
              <input
                className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""}`}
                type="password"
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                placeholder="Enter Your Password"
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
              <br />
              <Link className="text-white" onClick={()=>setShowForgotPassword(true)} style={{marginLeft:"240px"}}>Forgot Password</Link>
            </div>
            <div className="mb-2">
              <button className="btn btn-primary btn-lg w-100 fw-semibold">Sign In</button>
            </div>
          </form>
          <div className="text-center ">
            <Link
              onClick={handleGoogleSignIn}
              className="w-100 fw-semibold text-white"
              style={{ marginTop: "10px" }}
            >
              SignIn with Google
            </Link>
          </div>
        </div>
      </div>     
    </>
  );
}

export default SignIn;
