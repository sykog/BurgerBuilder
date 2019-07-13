import {put} from 'redux-saga/effects';
import * as actions from '../Actions/index';
import axios from "../../axiosOrders";

export function* completePurchaseSaga(action) {
  yield put(actions.startPurchase());

  try {
    const response = yield axios.post('orders.json', action.orderData);
    yield put(actions.completePurchaseSuccess(response.data.name, action.orderData));
  } catch (error) {
    yield put(actions.completePurchaseFailed(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.initializeFetchedOrders());

  try {
    const response = yield axios.get('orders.json?auth=' + action.token);

    const orders = [];
    for (let key in response.data) {
      orders.push({...response.data[key], id: key})
    }
    yield put(actions.fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(actions.fetchOrdersFailed(error))
  }
}