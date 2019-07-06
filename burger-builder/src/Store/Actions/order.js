import * as actionTypes from './actionTypes';
import axios from '../../axiosOrders';

export const initializeCheckout = () => {
  return {
    type: actionTypes.INITIALIZE_CHECKOUT
  };
};

export const startPurchase = () => {
  return {
    type: actionTypes.START_PURCHSASE
  }
}

export const completePurchase = orderData => {
  return dispatch => {
    dispatch(startPurchase());

    axios.post('orders.json', orderData).then(response => {
      dispatch(completePurchaseSuccess(response.data.name, orderData));
    }).catch(error => {
      dispatch(completePurchaseFailed(error));
    });
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
  return dispatch => {
    dispatch(initializeFetchedOrders());
    axios.get('orders.json?auth=' + token).then(response => {
      const orders = [];
      for (let key in response.data) {
        orders.push({...response.data[key], id: key})
      }
      dispatch(fetchOrdersSuccess(orders));
    }).catch(error => {
      dispatch(fetchOrdersFailed(error))
    });
  };
};

export const initializeFetchedOrders = () => {
  return {
    type: actionTypes.INITIALIZE_FETCHED_ORDERS
  };
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