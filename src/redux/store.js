import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './rootReducer';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // You can specify which slices to blacklist or whitelist
  // blacklist: ['auth'], // This will prevent 'auth' slice from persisting
  // whitelist: ['auth'], // You can also whitelist specific slices if you want
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  // If you have non-serializable data, you can disable the serializability check
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // You can add more actions to ignore here
        ignoredPaths: ['someReducer.someNonSerializableValue'], // Ignore specific paths if needed
      },
    }),
});

// Create a persistor
const persistor = persistStore(store);

// Export the store and persistor
export { persistor };
export default store;
