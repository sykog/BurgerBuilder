import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZE_CHECKOUT:
      return {
        ...state,
        loading: false,
        purchased: false
      }
    case actionTypes.START_PURCHSASE:
      return {
        ...state,
        loading: true
      };
    case actionTypes.COMPLETE_PURCHASE_SUCCESS:
      const order = {
        ...action.orderData,
        id: action.orderId
      }

      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(order)
      };
    case actionTypes.COMPLETE_PURCHASE_FAILED:
      return {
        ...state,
        loading: false
      };
    case actionTypes.INITIALIZE_FETCHED_ORDERS:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionTypes.FETCH_ORDERS_FAILED:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
};

export default reducer;
