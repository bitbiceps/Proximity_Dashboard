// redux/notificationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define initial state for notifications
const initialState = {
  notifications: [],
};

// Create the slice for notifications
const notificationsSlice = createSlice({
  name: 'notifications',
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
  },
});

// Export the actions from the slice
export const { addNotification, clearNotifications } = notificationsSlice.actions;

// Export the reducer to be used in the store
export default notificationsSlice.reducer;
