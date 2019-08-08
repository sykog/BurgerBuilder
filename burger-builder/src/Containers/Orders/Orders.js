import React, {useEffect} from 'react';
import {connect} from "react-redux";
import axios from '../../axiosOrders';
import * as actions from '../../Store/Actions/index';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

const Orders = props => {

  useEffect(() => {
    props.onFetchOrders(props.token);
    // eslint-disable-next-line
  }, []);

  let orders = <Spinner/>;
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price}
             orderName={order.orderData.name}/>
    ));
  }

  return (
    <div>
      {orders}
    </div>
  );
}

const matchStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(matchStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));