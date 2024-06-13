import {
  SIGN_IN_FAIL,
  SIGN_IN_SUCCESS,
  UPDATE_AUTH_LOADER,
} from "./actionType";

const initialState = {
  user: {},
  error: {},
  loader: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_AUTH_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
