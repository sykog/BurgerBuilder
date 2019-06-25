import React from 'react';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(ingredient => {
    return (
      <li key={ingredient}>
        <span style={{textTransform: 'capitalize'}}>{ingredient}:</span>
        {props.ingredients[ingredient]}
      </li>);
  });

  return (
    <React.Fragment>
      <h3>You Order</h3>
      <p>A delicious burger with the ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout</p>
    </React.Fragment>
  );
};

export default orderSummary;