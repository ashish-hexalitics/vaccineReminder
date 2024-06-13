import { call, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  UPDATE_AUTH_LOADER,
} from "./actionType";
import { signInSuccess, signInFail, updateAuthLoader } from "./authAction";
import { loginUser } from "../../helpers/api/authApi";

function* signInSaga(action) {
  yield put(updateAuthLoader(true));
  try {
    const { data, navigate } = action.payload;
    const response = yield call(loginUser, data);
    localStorage.setItem("authUser", JSON.stringify(response.response_data));
    localStorage.setItem("authToken", response.token);
    yield put(signInSuccess(response.response_data));
    navigate("/admin/dashboard");
  } catch (error) {
    yield put(signInFail(error));
  } finally {
    yield put(updateAuthLoader(false));
  }
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN, signInSaga);
}

export default watchSignIn;
