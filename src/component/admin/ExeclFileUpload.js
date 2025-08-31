
import axios from "axios";
import { useState } from "react";
import Backend from "../../apis/Backend";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ExcelFileUpload() {
  const navigate = useNavigate()
  const [excelFile, setExcelFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const uploadFile = async (event) => {
    event.preventDefault();

    if (!excelFile) {
      toast.warning("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", excelFile);

    try {
      await axios.post(Backend.STUDENT_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("File uploaded successfully!");
      setFileName("");
      setExcelFile(null);
      setTimeout(() => navigate(-1), 900)

    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload file.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="card shadow-lg p-4"
          style={{ maxWidth: "450px", width: "100%", borderRadius: "15px" }}
        >
          <h3 className="text-center mb-3 text-primary">Upload Excel File</h3>
          <p className="text-center text-muted">
            Import student data via Excel (.xlsx or .xls)
          </p>

          <form onSubmit={uploadFile}>
            <div className="form-group">
              <label className="font-weight-bold">Select Excel File</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  className="custom-file-input"
                  id="excelFile"
                  onChange={(e) => {
                    setExcelFile(e.target.files[0]);
                    setFileName(e.target.files[0]?.name || "");
                  }}
                />
                <label className="custom-file-label" htmlFor="excelFile">
                  {fileName || "Choose file..."}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-block mt-3"
              style={{ borderRadius: "10px" }}
            >
              <i className="fa fa-upload mr-2"></i> Upload
            </button>
            <button
            onClick={()=>navigate(-1)}
              className="btn btn-secondary btn-block mt-3"
              style={{ borderRadius: "10px" }}
            >
              <i className="fa fa-upload mr-2"></i> Cancel
            </button>
          </form>

          {/* <div className="text-center mt-3">
            <small className="text-muted">
              Supported formats: <b>.xlsx</b>, <b>.xls</b>
            </small>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default ExcelFileUpload;
