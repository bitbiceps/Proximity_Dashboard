import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../axios/instance";

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error("User ID is required");
      const url = `${baseURL}/topic?userId=${userId}`;
      const { data } = await axios.get(url);
      return data.data; 
    } catch (err) {
      console.error("Error fetching topics:", err);
      return rejectWithValue(err.response?.data || "Failed to fetch topics");
    }
  }
);

const initialState = {
  topics: [],
  currentSelectedTopic: null,
  loading: false,
  error: null,
};

// Topics slice
const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetStateTopic: (state) => {
      state.topics = [];
      state.currentSelectedTopic = null;
      state.error = null;
    },
    setCurrentSelectedTopic: (state, action) => {
      state.currentSelectedTopic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentSelectedTopic, resetStateTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
