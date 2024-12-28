import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../axios/instance";

// Login async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        credentials
      );
      console.log("logres",response)
      return response.data; // assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const updatedArticles = createAsyncThunk(
  "auth/updatedArticles",
  async (userId, { rejectWithValue }) => {
    console.log("djfbhdbfhdbfhdb", userId);
    try {
      const response = await axios.get(`${baseURL}/api/auth/updated/${userId}`);
      console.log("upddddddddddddd", response);
      console.log("saveRes", response.data);

      return response.data; // assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Registration async thunk
export const submitRegistration = createAsyncThunk(
  "auth/submitRegistration",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/register`,
        formData
      );
      console.log("sign", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    approvedTopics: null,
    registerUser: null,
  },
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.approvedTopics = null;
      state.registerUser = null;
    },
    registerResetState: (state) => {
      state.registerUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login action
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatedArticles.fulfilled, (state, action) => {
        state.updatedArticles = action.payload;
      })

      // Handle registration action
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registerUser = action.payload;
        state.error = null;
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState, registerResetState } = authSlice.actions;

export default authSlice.reducer;
