import { createSlice } from "@reduxjs/toolkit";

// Initial state for the topics slice
const initialState = {
  topics: [],
  currentSelectedTopic: null,
};

// Topics slice using createSlice from Redux Toolkit
const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetStateTopic: (state) => {
      state.topics = [];
      state.currentSelectedTopic = null;
    },
    // Setter action to set the topics
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setCurrentSelectedTopic: (state, action) => {

      state.currentSelectedTopic = action.payload;
      console.log("selected topic id " ,state.currentSelectedTopic)
    },
  },
});

// Export the actions
export const { setTopics, setCurrentSelectedTopic, resetStateTopic } = topicsSlice.actions;

// Export the reducer
export default topicsSlice.reducer;
