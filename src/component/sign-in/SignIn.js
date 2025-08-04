
import axios from "axios";
import { useState } from "react";
import Backend from "../../apis/Backend";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
// import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../sign-in/firebase";

// import { auth, provider, signInWithPopup } from "../../firebaseConfig"; // Import Firebase

function SignIn() {
    const navigate = useNavigate();

    const [state, setState] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    // Validate Form
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

    // Normal Login
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

    // Google Sign-In
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const response = await axios.post(Backend.GOOGLE_LOGIN, { email: user.email });
            const chk = response.data.findUser
            console.log(chk)
            sessionStorage.setItem("current-user", JSON.stringify(response.data.findUser));
            console.log(chk.role)
            if (chk.role === "student") {
                toast.success("Signed in with Google");
                navigate("/student");
            }
            else if (chk.role === "admin") {
                toast.success("signed in with google")
                navigate('/admin')
            }
            else if (chk.role === "teacher") {
                toast.success("Signed in with sucess")
                navigate('/teacher-portal')
            }
        } catch (err) {
            console.error(err);
            alert(err)
            toast.error(err)

            // toast.error("Google Sign-In Failed");
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
                    className="p-4 rounded"
                    style={{
                        backgroundColor: "rgba(250, 250, 250, 0.8)",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    <h2 className="text-center mb-4">ITEP-Assignment</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                type="email"
                                value={state.email}
                                onChange={(e) => setState({ ...state, email: e.target.value })}
                                placeholder="Enter Your Email"
                            />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div className="mb-3">
                            <input
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                type="password"
                                value={state.password}
                                onChange={(e) => setState({ ...state, password: e.target.value })}
                                placeholder="Enter Your Password"
                            />
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary w-100">Sign In</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn btn-danger w-100"
                            style={{ marginTop: "10px" }}
                        >
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
