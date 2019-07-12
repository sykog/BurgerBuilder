import {put} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';

// * waits for ansync code to finish
export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put({
    type: actionTypes.LOG_OUT
  });
}