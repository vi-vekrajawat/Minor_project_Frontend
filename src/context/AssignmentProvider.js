import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Backend from "../apis/Backend";
export const AssignmentContext = createContext()
const AssignmentProvider = ({ children }) => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const response = await axios.get(Backend.GET_AAASIGNMENT);
        setTask(response.data.assignment);
      } catch (err) {
        console.log(err);
      }
    };
    loadAssignments();
  }, []);

  return (
    <AssignmentContext.Provider value={{ task, setTask }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentProvider;
