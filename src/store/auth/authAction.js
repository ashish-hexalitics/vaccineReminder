import {
  SIGN_IN,
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  UPDATE_AUTH_LOADER,
} from "./actionType";

const signIn = (data, navigate) => {
  return {
    type: SIGN_IN,
    payload: { data, navigate },
  };
};

const signInSuccess = (data) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data,
  };
};

const signInFail = (error) => {
  return {
    type: SIGN_IN_FAIL,
    payload: error,
  };
};

const updateAuthLoader = (loader) => {
  return {
    type: UPDATE_AUTH_LOADER,
    payload: loader,
  };
};

export { signIn, signInSuccess, signInFail, updateAuthLoader };
