import { all } from 'redux-saga/effects';
import watchSignIn from './auth/authSaga';
import watchCreateUser from './userConfigure/userConfigSaga';

function* rootSaga() {
  yield all([
    watchSignIn(),
    watchCreateUser(),
    // add other sagas here
  ]);
}

export default rootSaga;
