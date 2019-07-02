import React, {Component} from "react";
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactInfo from './ContactInfo';
import CheckoutSummary from '../../Components/Order/CheckoutSummary';

class Checkout extends Component {
  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-info');
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.props.ingredients} continueCheckout={this.continueCheckout}
        cancelCheckout={this.cancelCheckout}/>
        <Route path={this.props.match.path + '/contact-info'} component={ContactInfo}/>
        )}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
};

export default connect(mapStateToProps)(Checkout);