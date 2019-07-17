import React from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = props => {

  const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
    return (
      <li key={ingredient}>
        <span style={{textTransform: 'capitalize'}}>{ingredient}:</span>
        {props.ingredients[ingredient]}
      </li>);
  });

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
      <p>A delicious burger with the ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <Button btnType="success" clicked={props.continue}>Continue</Button>
      <Button btnType="danger" clicked={props.cancel}>Cancel</Button>
    </React.Fragment>
  );
}

export default OrderSummary;