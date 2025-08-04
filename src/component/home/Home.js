
import { Link } from "react-router-dom";

function Home() {
    return <>
        <div className="container-fluid" style={{ maxWidth: "1200px" }}>

            {/* Header Section */}
            <div>
                <div>
                    <h2 className="text-center">
                        ITEP-Assignment
                    </h2>
                    <div className="text-center mt-3">
                        <span>Modern Assignment Management System for Educational Institutions</span>
                    </div>
                    <div className="text-center mt-3">
                        <img
                            src="https://cdn.theorg.com/e3f93e8e-1417-4771-b4ef-283263d4230f_medium.jpg"
                            className="img-fluid"
                            style={{ maxHeight: "60px" }}
                            alt="logo"
                        />
                    </div>
                </div>

                {/* Portal Cards */}
                <div className="mt-3">
                    <div className="row no-gutters justify-content-center text-center">

                        {/* Admin */}
                        <div className="p-2 mx-2 flex-fill" style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", backgroundColor: "white", minWidth: "250px", maxWidth: "300px" }}>
                            <img
                                src="https://play-lh.googleusercontent.com/6kTjj47chEYx1LGlvqGiv661DvAiFrDPkjqaUpKqju-4J38mGBru2wi2S-SrCKZu_NaK=w240-h480-rw"
                                className="img-fluid"
                                style={{ maxHeight: "50px" }}
                                alt="Admin"
                            />
                            <h5 className="mt-3">Admin Portal</h5>
                            <span>Manage users, batches, and oversee the entire <br />system</span><br />
                            <Link to="/sign-in"><button className="btn btn-success mt-3">Login as Admin</button></Link>
                        </div>

                        {/* Student */}
                        <div className="p-2 mx-2 flex-fill" style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", backgroundColor: "white", minWidth: "250px", maxWidth: "300px" }}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucvpHtMVPdMy3xB6DlJ_pRk-bUFOv1eziNXzF1QMK4eRJbPNb"
                                className="img-fluid"
                                style={{ maxHeight: "50px" }}
                                alt="Student"
                            />
                            <h5 className="mt-3">Student Portal</h5>
                            <span>View assignments, submit work, and track your <br />progress</span><br />
                            <Link to="/sign-in"><button className="btn btn-success mt-3">Login as Student</button></Link>
                        </div>

                        {/* Teacher */}
                        <div className="p-2 mx-2 flex-fill " style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", backgroundColor: "white", minWidth: "250px", maxWidth: "300px" }}>
                            <img
                                src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkoq0NS0SsCzTS7ZgjVmcW1g3YkST0kt74Oqux0L48IO1-jI_7"
                                className="img-fluid"
                                style={{ maxHeight: "50px" }}
                                alt="Teacher"
                            />
                            <h5 className="mt-3">Teacher Portal</h5>
                            <span>Create assignments, manage batches, and <br />track submissions</span><br />
                            <Link to="/sign-in"><button className="btn btn-success mt-3">Login as Teacher</button></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="mt-4 p-3" style={{ boxShadow: "1px 0px 2px 0px grey", borderRadius: "5px" }}>
                <h4 className="text-center mt-3">Key Features</h4>
                <div className="row justify-content-center text-center">

                    <div className="p-3 mx-3" style={{ minWidth: "150px", flex: "1 1 200px" }}>
                        <img src="https://compact-pay-product-frontend.vercel.app/static/media/creatAccount.8b9e975005d743c681e2ee5aca28543f.svg" className="img-fluid" style={{ maxHeight: "50px" }} alt="Assignment" />
                        <h6>Assignment Management</h6>
                        <p>Create, assign, and track<br /> assignments efficiently</p>
                    </div>

                    <div className="p-3 mx-3" style={{ minWidth: "150px", flex: "1 1 200px" }}>
                        <img src="https://cdn.prod.website-files.com/5c837a12af626286ed0fec32/5d68d7258dfed9f03659fa6e_ERG%20-%20Sunlight.png" className="img-fluid" style={{ maxHeight: "50px" }} alt="Batch" />
                        <h6>Batch Management</h6>
                        <p>Organize students into manageable<br /> batches</p>
                    </div>

                    <div className="p-3 mx-3" style={{ minWidth: "150px", flex: "1 1 200px" }}>
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..." className="img-fluid" style={{ maxHeight: "50px" }} alt="File" />
                        <h6>File Submissions</h6>
                        <p>Easy file upload and submission<br /> system</p>
                    </div>

                    <div className="p-3 mx-3" style={{ minWidth: "150px", flex: "1 1 200px" }}>
                        <img src="https://a.thumbs.redditmedia.com/ZuJ04A6Rngx8PSr-Clk5mkLuhi9lCfrDJuFLvNHz--8.jpg" className="img-fluid" style={{ maxHeight: "50px" }} alt="Role" />
                        <h6>Role-based Dashboards</h6>
                        <p>Customized experience for each user type</p>
                    </div>

                </div>
            </div>

        </div>
    </>
}

export default Home;
