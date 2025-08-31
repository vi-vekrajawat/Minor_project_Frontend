import { useNavigate, useParams } from "react-router-dom";
import "./NoticeCreate.css";
import { useState } from "react";
import { title } from "framer-motion/client";
import Backend from "../../apis/Backend";
import axios from "axios";

function NoticeCreate() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [newNotice, setNewNotice] = useState({
        title: "",
        description: "",
        createdBy: id
    })
    const handleNotice = async (event) => {
        try {
            let res = await axios.post(Backend.CREATE_NOTICE, newNotice)
            setNewNotice({
                title: "",
                description: "",
                createdBy: ""

            })
            alert("Create Successfully")
            navigate(-1)

        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="notice-card">
            <h3 className="notice-title"> Create Notice</h3>

            <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                    className="form-control"
                    type="text"
                    onChange={(event) => setNewNotice({ ...newNotice, title: event.target.value })}
                    placeholder="Enter notice subject"
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                    onChange={(event) => setNewNotice({ ...newNotice, description: event.target.value })}

                    className="form-control"
                    rows="4"
                    placeholder="Enter notice description..."
                ></textarea>
            </div>

            <div className="d-grid">
                <button onClick={() => handleNotice()} className="btn btn-primary btn-lg"> Create Notice</button>
                <button onClick={() => navigate(-1)} className="btn btn-secondary btn-lg"> Cancel</button>
            </div>
        </div>
    );
}

export default NoticeCreate;
