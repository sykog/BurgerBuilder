import React, {Component} from "react";
import {Route} from 'react-router-dom';
import ContactInfo from './ContactInfo';
import CheckoutSummary from '../../Components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = + param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-info');
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} continueCheckout={this.continueCheckout}
        cancelCheckout={this.cancelCheckout}/>
        <Route path={this.props.match.path + '/contact-info'} render={(props) => (
          <ContactInfo ingredients={this.state.ingredients} price={this.state.totalPrice}
                       {...props}/>
        )}/>
      </div>
    );
  }
}

export default Checkout;