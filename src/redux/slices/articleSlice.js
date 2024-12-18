import { createSlice } from "@reduxjs/toolkit";

// Initial state for the articles slice
const initialState = {
  articles: [],
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
    // Getter action (we won't need an actual getter here, Redux handles state access)
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    removeArticle: (state, action) => {
      state.articles = state.articles.filter(
        (article) => article.id !== action.payload
      );
    },
  },
});

// Export the actions
export const { setArticles } = articlesSlice.actions;

// Export the reducer
export default articlesSlice.reducer;
