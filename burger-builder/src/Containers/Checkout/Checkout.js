import React, {Component} from "react";
import CheckoutSummary from '../../Components/Order/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {}
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      ingredients[param[0]] = + param[1];
    }
    this.setState({ingredients: ingredients})
  }

  continueCheckout = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} continueCheckout={this.continueCheckout}
        cancelCheckout={this.cancelCheckout}/>
      </div>
    );
  }
}

export default Checkout