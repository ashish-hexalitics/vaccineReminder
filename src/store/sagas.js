import { all } from 'redux-saga/effects';
import watchSignIn from './auth/authSaga';

function* rootSaga() {
  yield all([
    watchSignIn(),
    // add other sagas here
  ]);
}

export default rootSaga;
