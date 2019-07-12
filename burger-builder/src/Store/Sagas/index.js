import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authenticateSaga, checkAuthStateSaga} from './auth';

export function* watchAuth() {
  yield takeEvery(actionTypes.INITIALIZE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga);
  yield takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTHENTICATE, authenticateSaga);
}