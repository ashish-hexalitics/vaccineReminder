import { call, put, takeLatest } from "redux-saga/effects";
import { CREATE_USER, GET_USER_LIST } from "./actionType";
import { createUserSuccess, userApiFail, updateUserLoader } from "./userAction";
import { registerUser } from "../../helpers/api/authApi";

function* createUserSaga({ payload }) {
  yield put(updateUserLoader(true));
  try {
    // const {  navigate } = payload;
    const response = yield call(registerUser, payload);
    yield put(createUserSuccess(response.response_data));
    // navigate("/admin/dashboard");
  } catch (error) {
    yield put(userApiFail(error));
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

function* watchCreateUser() {
  yield takeLatest(CREATE_USER, createUserSaga);
  yield takeLatest(GET_USER_LIST, getUserSaga);
}

export default watchCreateUser;
