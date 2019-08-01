import React from "react";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactInfo from './ContactInfo';
import CheckoutSummary from '../../Components/Order/CheckoutSummary';

const Checkout = props => {

  let orderSummary = <Redirect to="/"/>;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null
    orderSummary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary ingredients={props.ingredients} />
        <ContactInfo/>
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