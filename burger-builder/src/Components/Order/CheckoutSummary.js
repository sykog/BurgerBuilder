import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './checkoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.checkout}>
      <h1>We hope it tastes good!</h1>
      <div>
        <Burger ingredients={props.ingredients}/>
        <Button btnType="success" clicked={props.continueCheckout}>CONTINUE</Button>
        <Button btnType="danger" clicked={props.cancelCheckout}>CANCEL</Button>
      </div>
    </div>
  );
}

export default checkoutSummary;