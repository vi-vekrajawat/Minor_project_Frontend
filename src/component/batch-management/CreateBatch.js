
import { useState } from "react";
import Backend from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateBatch() {
  const navigate = useNavigate()
  const [batchInfo, setBatchInfo] = useState({
    batchName: "",
    launchDate: "",
    expireDate: "",
  });

  const submitBatch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(Backend.CREATE_BATCH, batchInfo);
      toast.success("Batch Created");
      console.log(response);
      setBatchInfo({
        batchName: "",
        launchDate: "",
        expireDate: "",
      });
      setTimeout(()=>navigate(-1),900)
      
      
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center"
                        style={{ minHeight: "100vh", width:"100vw", backgroundColor: "#f8f9fa" }}

        // style={{
        //   width: "100%",
        //   height: "100vh", // full viewport height
        // }}
      >
        <form
          onSubmit={submitBatch}
          className="bg-white shadow p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "500px", 
          }}
        >
          <div className="form-group">
            <label>Batch Name:</label>
            <input
              value={batchInfo.batchName}
              onChange={(event) =>
                setBatchInfo({ ...batchInfo, batchName: event.target.value })
              }
              className="form-control"
              type="text"
              placeholder="Enter Batch Name"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Launch Date:</label>
            <input
              value={batchInfo.launchDate}
              onChange={(event) =>
                setBatchInfo({ ...batchInfo, launchDate: event.target.value })
              }
              className="form-control"
              type="date"
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Expiry Date:</label>
            <input
              value={batchInfo.expireDate}
              onChange={(event) =>
                setBatchInfo({ ...batchInfo, expireDate: event.target.value })
              }
              className="form-control"
              type="date"
              required
            />
          </div>
<div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary form-control mt-4">
            Create
          </button>
          <button onClick={()=>navigate(-1)} type="submit" className="btn btn-secondary form-control mt-4">
            Cancel
          </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBatch;
