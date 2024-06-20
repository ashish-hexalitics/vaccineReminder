import { all } from 'redux-saga/effects';
import watchSignIn from './auth/authSaga';
import watchCreateUser from './userConfigure/userConfigSaga';
import watchVaccineTemplateSaga from "./vaccineTemplates/vaccineTemplateActionSaga";
import watchUserRolesSaga from "./userRoles/userRolesSaga";
import watchModulesSaga from "./modules/modulesSaga";


function* rootSaga() {
  yield all([
    watchSignIn(),
    watchCreateUser(),
    watchVaccineTemplateSaga(),
    watchUserRolesSaga(),
    watchModulesSaga()
    // add other sagas here
  ]);
}

export default rootSaga;
