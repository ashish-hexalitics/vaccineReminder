import { call, put, takeLatest } from "redux-saga/effects";
import { GET_VACCINE_TEMPLATES, CREATRE_VACCINE_TEMPLATES } from "./actionType";
import {
  getVaccineTemplateListSuccess,
  vaccineTemplateApiFail,
  updateVaccineTemplateLoader,
} from "./vaccineTemplateAction";
import {
  getVaccineTemplates,
  createVaccineTemplatesApi,
} from "../../helpers/api/vaccineTemplateApi";
import toastr from "toastr";

function* fetchVaccineTemplates() {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(getVaccineTemplates);
    yield put(getVaccineTemplateListSuccess(response.response_data));
    // toastr.success(response.message);
  } catch (error) {
    yield put(vaccineTemplateApiFail(error));
    toastr.error(error.response.data.message);
  } finally {
    yield put(updateVaccineTemplateLoader(false));
  }
}

function* createVaccineTemplates({payload:{data}}) {
  yield put(updateVaccineTemplateLoader(true));
  try {
    const response = yield call(createVaccineTemplatesApi,data);
    toastr.success(response.message);
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
  yield takeLatest(CREATRE_VACCINE_TEMPLATES, createVaccineTemplates);
}

export default watchVaccineTemplateSaga;
