import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  USER_API_FAIL,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  UPDATE_USERS_LOADER,
} from "./actionType";

const getUserList = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data,
  };
};

const getUserListSuccess = (data) => {
  return {
    type: GET_USER_LIST_SUCCESS,
    payload: data,
  };
};

const createUser = (data) => {
  return {
    type: CREATE_USER,
    payload: data,
  };
};

const createUserSuccess = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};

const userApiFail = (error) => {
  return {
    type: USER_API_FAIL,
    payload: error,
  };
};

const updateUserLoader = (loader) => {
  return {
    type: UPDATE_USERS_LOADER,
    payload: loader,
  };
};

export {
  getUserList,
  getUserListSuccess,
  createUser,
  createUserSuccess,
  userApiFail,
  updateUserLoader,
};
