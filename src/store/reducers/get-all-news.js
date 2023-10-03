import { createSlice } from "@reduxjs/toolkit";
import { getAllNewsAction } from "../actions/get-all-news";
const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: ''

}
const getAllNews = createSlice(
    {
        name: "news",
        initialState,
        extraReducers: buiilder => {
            buiilder.addCase(getAllNewsAction.pending, (state, action) => {
                state.isLoading = true;
            }),
                buiilder.addCase(getAllNewsAction.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.isSuccess = true

                }),
                buiilder.addCase(getAllNewsAction.rejected, (state, action) => {
                    state.errorMessage = action.payload;
                    state.isLoading = false
                    state.isSuccess = false
                })
        }
    }

)


export default getAllNews.reducer
