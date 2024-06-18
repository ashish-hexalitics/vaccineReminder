import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_USER,
  GET_USER_LIST,
  GET_USER_DETAIL,
  UPDATE_USER_DETAILS,
} from "./actionType";
import {
  createUserSuccess,
  getUserDetailSuccess,
  userApiFail,
  updateUserLoader,
  updateUserDetailSuccess,
} from "./userAction";
import { registerUser } from "../../helpers/api/authApi";
import {
  getUserDetailsApi,
  updateUserDetailsApi,
} from "../../helpers/api/userApi";
import toastr from "toastr";

function* createUserSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    // const {  navigate } = payload;
    const response = yield call(registerUser, payload);
    yield put(createUserSuccess(response.response_data));
    toastr.success("Create User Success");
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* getUserSaga(action) {
  yield put(updateUserLoader(true));
  try {
    // const { data } = action.payload;
    // const response = yield call(getUserList, data);
    // yield put(getUserListSuccess(response.response_data));
  } catch (error) {
    yield put(userApiFail(error));
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* getUserDetailSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    const { userId } = payload;
    const response = yield call(getUserDetailsApi, userId);
    yield put(getUserDetailSuccess(response.response_data));
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* updateUserDetailSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    const { userId, data } = payload;
    const response = yield call(updateUserDetailsApi, userId, data);
    yield put(updateUserDetailSuccess(response.response_data));
  } catch (error) {
    yield put(userApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateUserLoader(false));
  }
}

function* watchCreateUser() {
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(GET_USER_LIST, getUserSaga);
  yield takeLatest(GET_USER_DETAIL, getUserDetailSaga);
  yield takeLatest(UPDATE_USER_DETAILS, updateUserDetailSaga);
}

export default watchCreateUser;
