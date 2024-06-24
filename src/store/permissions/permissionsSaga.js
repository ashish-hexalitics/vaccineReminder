import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PERMISSIONS, UPDATE_PERMISSIONS } from "./actionType";
import {
  resetPermissions,
  getPermissionsSuccess,
  permissionApiFail,
  updatePermissionLoader,
  updatePermissionSuccess,
} from "./permissionsAction";
import {
  getPermissionsApi,
  updatePermissionAPi,
} from "../../helpers/api/permissionApi";
import toastr from "toastr";

function* fetchPermissions() {
  yield put(resetPermissions());
  yield put(updatePermissionLoader(true));
  try {
    const response = yield call(getPermissionsApi);
    yield put(getPermissionsSuccess(response.response_data));
  } catch (error) {
    yield put(permissionApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updatePermissionLoader(false));
  }
}

function* updatePermissions({ payload: { data } }) {
  yield put(updatePermissionLoader(true));
  try {
    const response = yield call(updatePermissionAPi, data);
    yield put(updatePermissionSuccess(response.response_data));
    toastr.success(response.message);
  } catch (error) {
    yield put(permissionApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updatePermissionLoader(false));
  }
}

function* watchPermissionSaga() {
  yield takeLatest(GET_PERMISSIONS, fetchPermissions);
  yield takeLatest(UPDATE_PERMISSIONS, updatePermissions);
}

export default watchPermissionSaga;
