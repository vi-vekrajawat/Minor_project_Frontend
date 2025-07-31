import { Link } from "react-router-dom"

function Home() {
    return <>

        <div>
            <div>
                <div >
                    <div >
                        <h2 className="text-center">
                            ITEP-Assignment
                        </h2>
                        <div className="text-center mt-3">
                            <span className="text-center">Modern Assignment Management System for Educational Institutions</span>
                        </div>
                        <div className="text-center mt-3">
                            <img src="https://img.freepik.com/premium-vector/lawyer-hat-vector-icon-can-be-used-crime-law-iconset_717774-57599.jpg" style={{ height: "80px" }}></img>
                        </div>
                    </div>
                    <div className="mt-3 ml-5">
                        <div className="row d-flex ">
                            <div className=" text-center ml-5 p-2" style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", height: "250px", backgroundColor: "white" }}>
                                <img src="https://play-lh.googleusercontent.com/6kTjj47chEYx1LGlvqGiv661DvAiFrDPkjqaUpKqju-4J38mGBru2wi2S-SrCKZu_NaK=w240-h480-rw" style={{height:"50px"}}></img>
                                <h5 className="mt-3">Admin Portal</h5><br />
                                <span >Manage users, batches, and oversee the entire <br />system</span><br />
                                <Link to="/sign-in" ><button className="btn btn-success mt-3" >Login as Admin</button></Link>
                            </div>
                            <div className=" text-center p-2 ml-4" style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", height: "250px", backgroundColor: "white" }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTucvpHtMVPdMy3xB6DlJ_pRk-bUFOv1eziNXzF1QMK4eRJbPNb" style={{height:"50px"}}></img>
                                <h5 className="mt-3">Student Portal</h5><br />
                                <span>View assignments, submit work, and track your <br />progress</span><br />
                                {/* <button className="btn btn-success mt-3">Login as Student</button> */}
                                <Link to="/sign-in" ><button className="btn btn-success mt-3" >Login as Student</button></Link>

                            </div>
                            <div className=" text-center p-2 ml-4" style={{ boxShadow: "1px 0px 1px 2px grey", borderRadius: "5px", height: "250px", backgroundColor: "white" }}>
                                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTkoq0NS0SsCzTS7ZgjVmcW1g3YkST0kt74Oqux0L48IO1-jI_7" style={{height:"50px"}}></img>
                                <h5 className="mt-3">teacher Portal</h5><br></br>
                                <span >Create assignments, manage batches, and <br />track submissions</span><br />
                                <Link to="/sign-in" ><button className="btn btn-success mt-3" >Login as Teacher</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* key fatures */}
            <div>
                <div style={{ boxShadow: "1px 0px 2px 0px grey" ,borderRadius:"5px"}}>
                    <h4 className="text-center mt-3">Key Features</h4>
                    <div className="row d-flex ml-5" style={{width:"1200px"}}>
                        <div className="text-center mt-2 ml-5" >
                           <img src="https://compact-pay-product-frontend.vercel.app/static/media/creatAccount.8b9e975005d743c681e2ee5aca28543f.svg" style={{height:"50px"}}/>
                            <h6 className="text-center">Assignment Management</h6>
                            <p className="text-center">Create, assign, and track<br /> assignments efficiently</p>
                        </div>
                        <div className="text-center mt-2 ml-5">
                            <img src="https://cdn.prod.website-files.com/5c837a12af626286ed0fec32/5d68d7258dfed9f03659fa6e_ERG%20-%20Sunlight.png" style={{height:"50px"}}/>
                            <h6>Batch Management</h6>
                            <p>Organize students into manageable<br/> batches</p>
                        </div>
                        <div className="text-center mt-2 ml-5">
                       <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAA3AEMDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAIDBAEFBv/EACUQAQACAQMDAwUAAAAAAAAAAAABAhEDBBITMUEFFHEhMkJhof/EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAZEQEBAQEBAQAAAAAAAAAAAAAAARECIUH/2gAMAwEAAhEDEQA/AP2YAAJm8QChMXhQAAAAAE9gZ3tmcR2QMd3G4nRmu14RefytPZ0k+NRsqtuM/p8/0qdz7as7i1b1tGa2zm3xLuXrnLhY3E0+2FOTIAAADGYxOGOrp6t5jp63TjzHGJy6rV5fLOazHhuVZXNt9vq6PGvX5adYxFeER/XQ9iJnwutMfWVvW+1dVWMREPQc2QAAAAAAAAAAAH//2Q=="></img>
                        <h6>File Submissions</h6>
                        <p>Easy file upload and submission<br/> system</p>
                        </div>
                         <div className="text-center mt-2 ml-5">
                        <img src="https://a.thumbs.redditmedia.com/ZuJ04A6Rngx8PSr-Clk5mkLuhi9lCfrDJuFLvNHz--8.jpg" style={{height:"50px"}}/>
                        <h6>Role-based Dashboards</h6>
                        <p>Customized experience for each user type</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Home