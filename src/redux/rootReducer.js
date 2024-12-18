import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import articleReducer from "./slices/articleSlice";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  payment: paymentReducer,
  articles: articleReducer,
});

export default rootReducer;
