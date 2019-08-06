import React from 'react';
import BuildControl from './BuildControl'
import classes from './buildControls.css';

const controlsList = [
  {label: 'patty', types: [
    'beef', 'chicken', 'black bean'
  ]},
  {
    label: 'toppings', types: [
      'bacon', 'cheese', 'lettuce', 'spinach', 'onion', 'tomato', 'pickle', 'pineapple'
  ]},
  {
    label: 'sauces', types: [
      'ketchup', 'mayo', 'bbq', 'mustard', 'hot sauce'
  ]}
];

const buildControls = props => (
  <div className={classes.buildControls}>
    <h3>Price: ${props.price.toFixed(2)}</h3>

    <div className={classes.ingredientsList}>
      {controlsList.map(control => (
        <div className={classes.ingredients} key={control.label}>
          <h3>{control.label.charAt(0).toUpperCase() + control.label.slice(1)}</h3>

          {control.types.map(ingredient => (
            <BuildControl key={ingredient} label={ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                          added={() => props.ingredientAdded(ingredient)}
                          removed={() => props.ingredientRemoved(ingredient)}
                          disabled={props.disabled[ingredient]}/>
          ))}
        </div>
      ))}
    </div>

    <button className={classes.order} disabled={!props.purchasable}
        onClick={props.ordering}>Order Now</button>
  </div>
);

export default buildControls;