import {
  GET_USER_ROLE_FAIL,
  GET_USER_ROLE_SUCCESS,
  UPDATE_ROLES_LOADER,
} from "./actionType";

const signIn = (data) => {
  return {
    type: SIGN_IN,
    payload: data,
  };
};

const userRoleSuccess = (data) => {
  return {
    type: GET_USER_ROLE_SUCCESS,
    payload: data,
  };
};

const userRoleFail = (error) => {
  return {
    type: GET_USER_ROLE_FAIL,
    payload: error,
  };
};

const updateRoleLoader = (loader) => {
  return {
    type: UPDATE_ROLES_LOADER,
    payload: loader,
  };
};

export { userRoleSuccess, userRoleFail, updateRoleLoader };
