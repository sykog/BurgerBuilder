import React from 'react';
import classes from './order.css'

const order = props => {
  const ingredients = [];
  for (let ingredient in props.ingredients) {
    if (props.ingredients[ingredient] > 0 ) {
      ingredients.push({name: ingredient, quantity: props.ingredients[ingredient]})
    }
  }

  const formattedIngredient = ingredients.map(ingredient => {
    let quantity = ingredient.quantity > 1 ? '(' + ingredient.quantity + ')' : null;
    return <span key={ingredient.name}>{ingredient.name} {quantity}</span>
  });

  return (
    <div className={classes.order}>
      <p><strong>Name: {props.orderName}</strong></p>
      <p>Ingredients: {formattedIngredient}</p>
      <h3>Price: ${Number.parseFloat(props.price).toFixed(2)}</h3>
    </div>
  );
}

export default order;