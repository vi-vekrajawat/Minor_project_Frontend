import axios from "axios";
import { useState } from "react";
import Backend from "../../apis/Backend"; 

function ExcelFileUpload() {
  const [excelFile, setExcelFile] = useState(null);

  const uploadFile = async (event) => {
    event.preventDefault(); 

    if (!excelFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("excelFile", excelFile); 

    try {
      const response = await axios.post(Backend.STUDENT_FILE, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important!
        },
      });
      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload file.");
    }
  };

  return (
    <>
    <div className="container ml-5 bg-danger" style={{height:"500px"}}>
      <form onSubmit={uploadFile} className="form-control">
        <div className="container bg-primary ml-5" >
          <input
            className="form-control"
            type="file"
            accept=".xlsx, .xls" // Optional: Restrict to Excel files
            onChange={(e) => setExcelFile(e.target.files[0])}
          />
          <button type="submit" className="btn btn-primary mt-2">Submit</button>
        </div>
      </form>
      </div>
    </>
  );
}

export default ExcelFileUpload;
