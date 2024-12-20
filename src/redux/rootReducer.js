import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import articleReducer from "./slices/articleSlice";
import generatedReducer from "./slices/generatedSlice";
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  payment: paymentReducer,
  articles: articleReducer,
  generated: generatedReducer,
});

export default rootReducer;
