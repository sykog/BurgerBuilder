import React from 'react';
import Burger from '../Burger/Burger';
import classes from './checkoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.checkout}>
      <h1>Enjoy your burger!</h1>
      <div>
        <Burger ingredients={props.ingredients}/>
      </div>
    </div>
  );
}

export default checkoutSummary;