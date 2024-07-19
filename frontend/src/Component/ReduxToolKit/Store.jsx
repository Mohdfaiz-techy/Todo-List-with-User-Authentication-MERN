import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './UserSlice';
import alertReducer from './AlertSlice';

const rootReducer = combineReducers({
  todo: userReducer,
  alert: alertReducer,
  // add other reducers here
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
