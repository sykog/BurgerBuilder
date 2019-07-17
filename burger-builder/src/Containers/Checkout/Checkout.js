import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactInfo from './ContactInfo';
import CheckoutSummary from '../../Components/Order/CheckoutSummary';

const Checkout = props => {

  const continueCheckout = () => {
    props.history.replace('/checkout/contact-info');
  }

  const cancelCheckout = () => {
    props.history.goBack();
  }

  let orderSummary = <Redirect to="/"/>;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null
    orderSummary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary ingredients={props.ingredients} continueCheckout={continueCheckout}
                         cancelCheckout={cancelCheckout}/>
        <Route path={props.match.path + '/contact-info'} component={ContactInfo}/>
      </div>
    );
  }

  return orderSummary
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);