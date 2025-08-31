import { configureStore } from "@reduxjs/toolkit";
import noticeSlice from "./NoticeSlice";
const store = configureStore({
    reducer:{
        noticeData:noticeSlice
    }
})

export default store