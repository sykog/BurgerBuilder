import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from '../../axiosOrders';
import * as actions from '../../Store/Actions/index';
import Order from '../../Components/Order/Order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner/>;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      ));
    }

    return (
      <div>
        {orders}
      </div>
    );
  }
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