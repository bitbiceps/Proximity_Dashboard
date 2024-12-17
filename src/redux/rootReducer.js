import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  payment: paymentReducer,
});

export default rootReducer;
