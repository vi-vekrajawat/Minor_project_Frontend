import { createSlice } from "@reduxjs/toolkit";

const noticeSlice = createSlice({
    name:"notice-slice",
    initialState:{
        noticeList:[]
    },
    reducers:{
        setNotice:(state,action)=>{
            state.noticeList=action.payload
        },
        addNotice:(state,action)=>{
            state.noticeList.push(action.payload)
        }
    }
})

export const {setNotice,addNotice} = noticeSlice.actions
export default noticeSlice.reducer