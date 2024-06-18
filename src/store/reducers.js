import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import configUserReducer from "./userConfigure/configUserReducer";
import vaccineTemplateReducer from "./vaccineTemplates/vaccineTemplateReducer";
import roleReducer from "./userRoles/roleReducer";

const rootReducer = combineReducers({
  authReducer,
  configUserReducer,
  vaccineTemplateReducer,
  roleReducer
});

export default rootReducer;
