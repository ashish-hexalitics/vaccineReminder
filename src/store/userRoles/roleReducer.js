import {
  GET_USER_ROLE_FAIL,
  GET_USER_ROLE_SUCCESS,
  UPDATE_ROLES_LOADER,
} from "./actionType";

const initialState = {
  roles: [],
  error: {},
  loader: false,
};

const userRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        roles: [ ...state.user, ...action.payload],
      };
    case GET_USER_ROLE_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    case UPDATE_ROLES_LOADER:
      return {
        ...state,
        loader: action.payload,
      };
    default:
      return state;
  }
};

export default userRoleReducer;
