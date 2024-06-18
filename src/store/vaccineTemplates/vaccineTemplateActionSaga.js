import { call, put, takeLatest } from "redux-saga/effects";
import { GET_VACCINE_TEMPLATES } from "./actionType";
import {
  getVaccineTemplateListSuccess,
  vaccineTemplateApiFail,
  updateVaccineTemplateLoader,
} from "./vaccineTemplateAction";
import { getVaccineTemplates } from "../../helpers/api/vaccineTemplateApi";
import toastr from "toastr";

function* fetchVaccineTemplates() {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(getVaccineTemplates);
    yield put(getVaccineTemplateListSuccess(response.response_data));
  } catch (error) {
    yield put(vaccineTemplateApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateVaccineTemplateLoader(false));
  }
}

function* watchVaccineTemplateSaga() {
  yield takeLatest(GET_VACCINE_TEMPLATES, fetchVaccineTemplates);
}

export default watchVaccineTemplateSaga;
