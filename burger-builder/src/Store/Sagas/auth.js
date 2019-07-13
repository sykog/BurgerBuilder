import {put, call, delay} from 'redux-saga/effects';
import * as actions from '../Actions/index';
import axios from "axios";

// * waits for ansync code to finish
export function* logoutSaga(action) {
  // call makes testing easier
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');

  yield put(actions.logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authenticateSaga(action) {
  yield put(actions.startAuthentication());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  }

  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
    'AIzaSyCuXjO_ZbysKPVTw_hTPpy4DgZdFf1ZIiU';
  if (!action.registering) url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
    'AIzaSyCuXjO_ZbysKPVTw_hTPpy4DgZdFf1ZIiU';

  try {
    const response = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
    yield localStorage.setItem('token', response.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', response.data.localId);

    yield put(actions.authenticateSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authenticateFailed(error.response.data.error));
  }
}

export function* checkAuthStateSaga(action) {
  const token = yield localStorage.getItem('token');

  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem('userId');
      const timeDifference = (expirationDate.getTime() - new Date().getTime()) / 1000;
      yield put(actions.authenticateSuccess(token, userId));
      yield put(actions.checkAuthTimeout(timeDifference));
    } else {
      yield (actions.logout());
    }
  }
}