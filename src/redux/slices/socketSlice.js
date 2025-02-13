// redux/notificationsSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Define initial state for notifications
const initialState = {
  notifications: [],
  socketEvents: null,
};

// Create the slice for notifications
const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // Action to add a new notification
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    // Action to clear all notifications
    clearNotifications: (state) => {
      state.notifications = [];
    },

    setSocketEvents: (state, action) => {
      state.socketEvents = action.payload;
    },
  },
});

// Export the actions from the slice
export const { addNotification, clearNotifications, setSocketEvents } =
  notificationsSlice.actions;

// Export the reducer to be used in the store
export default notificationsSlice.reducer;
