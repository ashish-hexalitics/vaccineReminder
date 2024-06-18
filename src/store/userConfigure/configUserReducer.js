import {
  GET_USER_LIST_SUCCESS,
  USER_API_FAIL,
  CREATE_USER_SUCCESS,
  UPDATE_USERS_LOADER,
  GET_USER_DETAIL_SUCCESS,
  RESET_USER_DETAILS,
  UPDATE_USER_DETAILS_SUCCESS,
} from "./actionType";

const initialState = {
  users: [],
  userDetails: {},
  error: {},
  loader: false,
};

const configUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload },
      };
    case GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...action.payload,
        },
      };
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: {
          ...action.payload,
        },
      };
    case USER_API_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_USERS_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    case RESET_USER_DETAILS:
      return {
        users: [],
        userDetails: {},
        error: {},
        loader: false,
      };

    default:
      return state;
  }
};

export default configUserReducer;
