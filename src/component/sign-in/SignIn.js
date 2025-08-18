

import axios from "axios";
import { useState } from "react";
import Backend from "../../apis/Backend";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../sign-in/firebase";

function SignIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Form validation
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

  // Normal login
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

  // Google login
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

  // Redirect based on role
  const redirectUser = (role) => {
    if (role === "teacher") setTimeout(() => navigate("/teacher-portal"), 900);
    else if (role === "admin") setTimeout(() => navigate("/admin"), 900);
    else setTimeout(() => navigate("/student"), 900);
  };

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          width: "100vw",
          backgroundImage: `url('https://infobeans.ai/wp-content/uploads/2023/08/InfoBeans-Home-Social-Cover-1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="p-4 rounded shadow"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            width: "100%",
            maxWidth: "420px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          }}
        >
          <h2 className="text-center mb-4 fw-bold text-dark">ITEP-Assignment</h2>
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
            </div>
            <div className="mb-3">
              <button className="btn btn-primary btn-lg w-100 fw-semibold">Sign In</button>
            </div>
          </form>
          <div className="text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-danger btn-lg w-100 fw-semibold"
              style={{ marginTop: "10px" }}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      {/* Hover & Focus effects for input boxes */}
      <style>{`
        .form-control {
          border-radius: 8px;
          transition: all 0.3s ease-in-out;
        }

        .form-control:hover {
          border-color: #0d6efd;
          box-shadow: 0 0 10px rgba(13, 110, 253, 0.3);
        }

        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 12px rgba(13, 110, 253, 0.5);
          outline: none;
        }

        .btn-primary:hover {
          transform: scale(1.03);
          transition: all 0.2s ease-in-out;
        }

        .btn-danger:hover {
          transform: scale(1.03);
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
}

export default SignIn;
