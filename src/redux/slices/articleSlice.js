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
    resetpState: (state) => {
      state.articles=[]
    },
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
export const { setArticles, setCurrentSelectedArticle,resetpState } = articlesSlice.actions;

// Export the reducer
export default articlesSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// // Initial state for the articles slice
// const initialState = {
//   articles: [],
//   currentSelectedArticle: null,
//   visibilityState: {}, // Object to track visibility of each article
// };

// // Articles slice using createSlice from Redux Toolkit
// const articlesSlice = createSlice({
//   name: "articles",
//   initialState,
//   reducers: {
//     resetpState: (state) => {
//       state.articles = [];
//       state.visibilityState = {};
//     },
//     setArticles: (state, action) => {
//       state.articles = action.payload;
//       // Initialize visibility state for all articles
      
//       state.visibilityState = action.payload.reduce((acc, article) => {
//         acc[article._id] = { headVisible: false, contentVisible: false };
//         return acc;
//       }, {});
//       console.log("Initialized visibilityState:", state.visibilityState);
//     },
//     setCurrentSelectedArticle: (state, action) => {
//       state.currentSelectedArticle = action.payload;
//     },
//     updateVisibilityState: (state, action) => {
//       const { articleId, visibility } = action.payload;
//       console.log("article._id:", articleId);
//       // Check if the articleId exists in visibilityState before updating
    

//       if (state.visibilityState[articleId]) {
//         state.visibilityState[articleId] = visibility;
//         console.log("Initialized visibilityState:", state.visibilityState);
        
//       } else {
//         console.error(`Article with ID ${articleId} not found in visibilityState.`);
//       }
//       console.log("Initialized visibilityState:", state.visibilityState);
//     }
//   },
// });

// // Export the actions
// export const {
//   setArticles,
//   setCurrentSelectedArticle,
//   updateVisibilityState,
//   resetpState,
// } = articlesSlice.actions;

// // Export the reducer
// export default articlesSlice.reducer;
