import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitRegistration = createAsyncThunk(
    "auth/submitRegistration",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          formData
        );
        console.log("Success Response:", response);
        return response.data;
      } catch (error) {
        console.error("Error Response:", error.response); 
        return rejectWithValue(error.response?.data || "Unknown error occurred");
      }
    }
  );
  

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
