import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../axios/instance";

//fetch user 
export const fetchUser = async (userId) => {
  try {
    if (userId) {
      const response = await axios.get(`${baseURL}/user/details?user=${userId}`, {
        headers: {
          "Content-Type": "application/json", // Ensure content type is JSON
        },
      });
      const dataToTransfer =  response.data.user; // Return the fetched user data
      return dataToTransfer;
    } else {
      throw new Error("User ID is required");
    }
  } catch (error) {
    throw error; // Re-throw error for external handling
  }
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is required");

      const response = await axios.get(`${baseURL}/user/details?user=${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);



// Login async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        credentials
      );
      return response.data; // assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const updatedArticles = createAsyncThunk(
  "auth/updatedArticles",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/api/auth/updated/${userId}`);

      return response.data; // assuming the response contains user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

//for future use 
export const updateTopic = createAsyncThunk(
  "auth/updateTopic",
  async ({ userId, answers }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/topic/generate`, { // use update topic url 
        userId,
        answers,
      });
      return response.data; // Assume the API returns updated user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update topic");
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
    // not in use 
    updateUserQuestionnaire(state, action) {
      if (state.user?.user) {
        state.user.user.questionnaire = action.payload;
      }
    },
    //not in use
    setUser(state, action) {
      state.user = action.payload;
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

      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatedArticles.fulfilled, (state, action) => {
        state.updatedArticles = action.payload;
      })

      // handle topic data  not in use 
      .addCase(updateTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload }; // Update user with the latest data
        state.error = null;
      })
      .addCase(updateTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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

export const { resetState, registerResetState, updateUserQuestionnaire, setUser } = authSlice.actions;

export default authSlice.reducer;
