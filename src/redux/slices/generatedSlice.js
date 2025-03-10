import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../axios/instance";
import { article } from "framer-motion/client";
import { toast } from "react-toastify";

export const updateRequestArticle = createAsyncThunk(
  "generated/updateRequestArticle",
  async ({ articleId , content }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/article/request-update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId , content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      toast.success(response.data?.message || 'Update request sended successfully');

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while sending update request')
      return rejectWithValue(error.message);
    }
  }
);
export const verifyRequestArticle = createAsyncThunk(
  "generated/verifyRequestArticle",
  async (
    {
      articleId,
      termsAndCondition, // You should pass the boolean values here
      companyName, // Similarly for the company name
      authorName, // And the author name
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${baseURL}/article/submit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          termsAndCondition, // You should pass the boolean values here
          companyName, // Similarly for the company name
          authorName, // And the author name
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const generateArticles = createAsyncThunk(
  "generated/generateArticles",
  async ({ _id, userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/article/create-article`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, userId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllTopics = createAsyncThunk(
  "generated/getAllTopics",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseURL}/topic?userId=${userId}`, {
        // Query parameter added
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const generatedSlice = createSlice({
  name: "generated",
  initialState: {
    specificArticle: null,
    articleVerify: null,
    articleUpdate: null,
    loading: false,
    error: null,
    articleGenerate: null,
    allTopics: null,
    articleloading: false,
  },
  reducers: {
    resetState: (state) => {
      state.articleVerify = null;
      state.articleUpdate = false;
      state.loading = null;
      state.error = null;
      state.articleGenerate = null;
      state.allTopics = null;
      state.articleloading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateRequestArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articleUpdate = action.payload;
      })
      .addCase(updateRequestArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyRequestArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRequestArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articleVerify = action.payload;
        state.specificArticle = action.payload;
      })
      .addCase(verifyRequestArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateArticles.pending, (state) => {
        state.articleloading = true;
        state.error = null;
      })
      .addCase(generateArticles.fulfilled, (state, action) => {
        state.articleloading = false;
        state.articleGenerate = action.payload;
      })

      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.allTopics = action.payload;
      });
  },
});

export const { resetState } = generatedSlice.actions;
export default generatedSlice.reducer;
