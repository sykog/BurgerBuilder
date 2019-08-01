import React from 'react';
import Button from '../UI/Button/Button';
import classes from './checkoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.checkout}>
      <h1>Enjoy your burger!</h1>
      <Button btnType="danger" clicked={props.cancelCheckout}>Back to edit</Button>
    </div>
  );
}

export default checkoutSummary;