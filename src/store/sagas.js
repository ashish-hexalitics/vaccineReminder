import { all } from 'redux-saga/effects';
import watchSignIn from './auth/authSaga';
import watchCreateUser from './userConfigure/userConfigSaga';
import watchVaccineTemplateSaga from "./vaccineTemplates/vaccineTemplateActionSaga";
import watchUserRolesSaga from "./userRoles/userRolesSaga";


function* rootSaga() {
  yield all([
    watchSignIn(),
    watchCreateUser(),
    watchVaccineTemplateSaga(),
    watchUserRolesSaga()
    // add other sagas here
  ]);
}

export default rootSaga;
