import {takeEvery, takeLatest, all} from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authenticateSaga, checkAuthStateSaga} from './auth';
import {initializeIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, completePurchaseSaga} from './order';

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.INITIALIZE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
    takeEvery(actionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTHENTICATE, authenticateSaga)
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INITIALIZE_INGREDIENTS, initializeIngredientsSaga);
}

export function* watchOrders() {
  yield all([
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
    takeLatest(actionTypes.COMPLETE_PURCHASE, completePurchaseSaga)
  ]);
}