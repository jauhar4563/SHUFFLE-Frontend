
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import adminAuthSlice from './reducers/adminAuthSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  adminAuth:adminAuthSlice
});

export default rootReducer;