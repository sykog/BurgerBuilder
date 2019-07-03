import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
  orders: [],
  loading: false
};

const completePurchaseSuccess = (state, action) => {
  const order = updateObject(action.orderData, {id: action.orderId});
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(order)
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_CHECKOUT:
      return updateObject(state, {purchased: false});
    case actionTypes.START_PURCHSASE:
      return updateObject(state, {loading: true});
    case actionTypes.COMPLETE_PURCHASE_SUCCESS:
      return completePurchaseSuccess(state, action);
    case actionTypes.COMPLETE_PURCHASE_FAILED:
      return updateObject(state,{loading: false});
    case actionTypes.INITIALIZE_FETCHED_ORDERS:
      return updateObject(state, {loading: true});
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {orders: action.orders, loading: false});
    case actionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state, {loading: false});
    default: return state;
  }
};

export default reducer;
