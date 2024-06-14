import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import configUserReducer from "./userConfigure/configUserReducer";

const rootReducer = combineReducers({
  authReducer,
  configUserReducer,
});

export default rootReducer;
