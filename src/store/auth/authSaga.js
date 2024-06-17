import { call, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  UPDATE_AUTH_LOADER,
} from "./actionType";
import { signInSuccess, signInFail, updateAuthLoader } from "./authAction";
import { loginUser } from "../../helpers/api/authApi";
import toastr from "toastr";

function* signInSaga(action) {
  yield put(updateAuthLoader(true));
  try {
    const { data, navigate } = action.payload;
    const response = yield call(loginUser, data);
    if (response?.response_data) {
      localStorage.setItem("authUser", JSON.stringify(response.response_data));
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("authRole", response.response_data.role_name);
      yield put(signInSuccess(response.response_data));
      navigate(`/${response.response_data.role_name}/dashboard`);
      toastr.success("Login Success");
    }
  } catch (error) {
    yield put(signInFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateAuthLoader(false));
  }
}

function* watchSignIn() {
  yield takeLatest(SIGN_IN, signInSaga);
}

export default watchSignIn;
