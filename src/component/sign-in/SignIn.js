import axios from "axios"
import { useState } from "react"
import Backend from "../../apis/Backend"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

function SignIn() {
    const navigate = useNavigate()

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (event) => {
        try {

            event.preventDefault()
            if (state.email && state.password) {
                const response = await axios.post(Backend.USER_LOGIN, state)
                sessionStorage.setItem("current-user", JSON.stringify(response.data.findUser))

                if (response.data.userRole === "teacher") {
                    toast.success("Sign In Successfully", response.data.userRole)
                    setTimeout(() => navigate('/teacher-portal'), 900);
                }
                else if (response.data.userRole === 'admin') {
                    toast.success("Sign In Successfully", response.data.userRole)
                    setTimeout(() => navigate('/admin'), 900);
                }
                else if (response.data.userRole === 'student') {
                    toast.success("Sign In Successfully", response.data.userRole)
                    setTimeout(() => navigate('/student'), 900);
                }
                else {
                    toast.error("wrong credentails")
                }



            }
        }
        catch (err) {
            await toast.error("Wrong credentails")
            console.log(err)
        }
    }
    return <>
        <ToastContainer></ToastContainer>
        <div className="p-5" style={{ boxShadow: "0px 0px 3px 0px grey", height: "300px", width: "500px", marginLeft: "400px", marginTop: "150px" }}>
            <h2 className="text-center">ITEP-Assignment</h2>
            <div>

                <form className="form" onSubmit={handleLogin}>
                    <div className="mt-3">
                        <input className="form-control" type="email" onChange={(event) => setState({ ...state, email: event.target.value })} placeholder="Enter Your Email"></input>
                    </div>
                    <div className="mt-3">
                        <input className="form-control" type="text" onChange={(event) => setState({ ...state, password: event.target.value })} placeholder="Enter Your Password"></input>
                    </div>
                    <div className="mt-3 text-center">
                        <button className="btn btn-primary form-control">Sign In</button>
                    </div>
                    <div className="text-center">
                        <a href="#" >Sign with Google</a>
                    </div>
                </form>


            </div>
        </div>
    </>
}
export default SignIn