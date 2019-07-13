import * as actionTypes from './actionTypes';

export const initializeCheckout = () => {
  return {type: actionTypes.INITIALIZE_CHECKOUT};
};

export const startPurchase = () => {
  return {type: actionTypes.START_PURCHSASE}
}

export const completePurchase = orderData => {
  return {
    type: actionTypes.COMPLETE_PURCHASE,
    orderData: orderData
  };
};

export const completePurchaseSuccess = (id, orderData) => {
  return {
    type: actionTypes.COMPLETE_PURCHASE_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const completePurchaseFailed = error => {
  return {
    type: actionTypes.COMPLETE_PURCHASE_FAILED,
    error: error
  };
};

export const fetchOrders = token => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token
  };
};

export const initializeFetchedOrders = () => {
  return {type: actionTypes.INITIALIZE_FETCHED_ORDERS};
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
  };
};