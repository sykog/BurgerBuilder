import React from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
    const quantity = props.ingredients[ingredient];

    return quantity ? (
      <li key={ingredient}>
        <span style={{textTransform: 'capitalize'}}>{ingredient}</span>
        {quantity > 1 ? ' (' + props.ingredients[ingredient] + ')' : null}
      </li>) : null;
  });

  return (
    <React.Fragment>
      <h2>Your Order</h2>
      <h3>Total: ${props.price.toFixed(2)}</h3>
      <ul>
        {ingredientSummary}
      </ul>
      <div>
        <Button btnType="success" clicked={props.continue}>Continue</Button>
        <Button btnType="danger" clicked={props.cancel}>Cancel</Button>
      </div>

    </React.Fragment>
  );
}

export default OrderSummary;