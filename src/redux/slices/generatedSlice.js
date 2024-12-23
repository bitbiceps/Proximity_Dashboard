import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const updateRequestArticle = createAsyncThunk(
  "generated/updateRequestArticle",
  async ({ articleId }, { rejectWithValue }) => {
    console.log("userIIdsdsdsII", { articleId });
    try {
      const response = await fetch(
        "http://localhost:5000/article/request-update",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articleId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const verifyRequestArticle = createAsyncThunk(
  "generated/verifyRequestArticle",
  async ({ articleId }, { rejectWithValue }) => {
    console.log("userIIdsdsdsII", { articleId });
    try {
      const response = await fetch("http://localhost:5000/article/submit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const data = await response.json();
      console.log("dataverify", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const generatedSlice = createSlice({
  name: "generated",
  initialState: {
    specificArticle:null,
    articleVerify: null,
    articleUpdate: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.articleVerify = null;
      state.articleUpdate = false;
      state.loading = null;
      state.error=null;
    },
  },
  //   reducers: {
  //     resetPaymentState: (state) => {
  //       state.clientSecret = null;
  //       state.loading = false;
  //       state.error = null;
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(updateRequestArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestArticle.fulfilled, (state, action) => {
        state.loading = false;
        console.log("acttttt", action.payload);
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
        console.log("verify", action.payload);
        state.articleVerify = action.payload;
        state.specificArticle=action.payload
      })
      .addCase(verifyRequestArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = generatedSlice.actions;
export default generatedSlice.reducer;
