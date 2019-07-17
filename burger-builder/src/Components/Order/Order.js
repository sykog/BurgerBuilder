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
    return <span key={ingredient.name}>{ingredient.name} ({ingredient.quantity})</span>
  });

  return (
    <div className={classes.order}>
      <p>Ingredients: {formattedIngredient}</p>
      <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;