import { createAsyncThunk } from "@reduxjs/toolkit";
import httpRequest from "../../config/networking/axios-instance";
import { NEWS_APP_KEY } from "../../config/constants/secrets";
import { Alert } from "react-native";

export const getAllNewsAction = createAsyncThunk('getALlNewsAPi', async (language, { rejectWithValue }) => {
  try {
    const { articles } = await httpRequest.get(`/top-headlines?language=${language}&apiKey=${NEWS_APP_KEY}`);
    return articles;
  } catch (error) {
    return rejectWithValue(error.message);
  }
})