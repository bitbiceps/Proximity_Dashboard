import { combineReducers } from "@reduxjs/toolkit";
import sidebarReducer from "./slices/sidebarSlice";
import authReducer from "./slices/authSlice";
import paymentReducer from "./slices/paymentSlice";
import articleReducer from "./slices/articleSlice";
import generatedReducer from "./slices/generatedSlice";
import topicReducer from "./slices/topicSlice";
import notificationsReducer from "./slices/notificationSlice";
import messageReducer from "./slices/messageSlice";
const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  auth: authReducer,
  payment: paymentReducer,
  articles: articleReducer,
  generated: generatedReducer,
  topics: topicReducer,
  notifications: notificationsReducer,
  message : messageReducer
});

export default rootReducer;
