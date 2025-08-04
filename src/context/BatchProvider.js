import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Backend from "../apis/Backend"
export const BatchContext = createContext()
const BatchProvider=({children}) =>{
    const [batchState,setBatchState] = useState([])

    useEffect(()=>{
        const loadBatch = async()=>{
            try{
                const batch = await axios.get(Backend.ALL_BATCHES)
                console.log(batch.data.getAll)
                setBatchState(batch.data.getAll)

            }
            catch(err){
                console.log(err)
            }
        }
        loadBatch()
    },[])

    return<>
    <BatchContext.Provider value={{batchState,setBatchState}}>
        {children}

    </BatchContext.Provider>
    </>

}
export default BatchProvider