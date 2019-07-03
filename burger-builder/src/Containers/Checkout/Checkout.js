import React, {Component} from "react";
import {Route, Redirect} from 'react-router-dom';
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
    let orderSummary = <Redirect to="/"/>;

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
      orderSummary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ingredients} continueCheckout={this.continueCheckout}
                           cancelCheckout={this.cancelCheckout}/>
          <Route path={this.props.match.path + '/contact-info'} component={ContactInfo}/>
        </div>
      );
    }

    return orderSummary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);