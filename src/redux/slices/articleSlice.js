import { createSlice } from "@reduxjs/toolkit";

// Initial state for the articles slice
const initialState = {
  articles: [],
  currentSelectedArticle: null,
};

// Articles slice using createSlice from Redux Toolkit
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // Setter action to set the articles
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setCurrentSelectedArticle: (state, action) => {
      state.currentSelectedArticle = action.payload;
    },
  },
});

// Export the actions
export const { setArticles, setCurrentSelectedArticle } = articlesSlice.actions;

// Export the reducer
export default articlesSlice.reducer;
