import axios from "axios"
import { useState } from "react"
import Backend from "../../apis/Backend"
import { toast, ToastContainer } from "react-toastify"

function CreateBatch() {


    const [batchInfo, setBatchInfo] = useState({
        batchName: '',
        launchDate: "",
        expireDate: "",

    })

    const submitBatch = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.post(Backend.CREATE_BATCH, batchInfo)
            toast.success("Batch Created")
            console.log(response)
            // alert("batch Created")
            setBatchInfo({
                batchName: '',
                launchDate: "",
                expireDate: "",

            })
        }
        catch (err) {
            console.log(err)
            toast.error("Something went Wrong")
        }
    }



    return <>
        <ToastContainer></ToastContainer>
        <div className=" p-5 mt-5 " style={{ marginLeft: "450px", boxShadow: "0px 0px 5px 0px grey" }}>
            <form action="" onSubmit={submitBatch} className="form-group  form">
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="">Batch Name:</label>
                        <input onChange={(event) => setBatchInfo({ ...batchInfo, batchName: event.target.value })} className="form-group form-control" type="text" placeholder="Enter Batch Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Lauch Date:</label>
                        <input onChange={(event) => setBatchInfo({ ...batchInfo, launchDate: event.target.value })} className="form-group form-control" type="date" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Expiry Date:</label>
                        <input onChange={(event) => setBatchInfo({ ...batchInfo, expireDate: event.target.value })} className="form-group form-control" type="date" name="" id="" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary form-control">Create</button>
                    </div>

                </div>
            </form>
        </div>
    </>
}

export default CreateBatch