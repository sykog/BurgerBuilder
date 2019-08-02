import React from 'react';
import BuildControl from './BuildControl'
import classes from './buildControls.css';

const controlsList = [
  {label: 'Lettuce', type: 'lettuce'},
  {label: 'Onion', type: 'onion'},
  {label: 'Tomato', type: 'tomato'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Patty', type: 'patty'}
]

const buildControls = props => (
  <div className={classes.buildControls}>
    <p>Price: ${props.price.toFixed(2)}</p>
    {controlsList.map(control => (
      <BuildControl key={control.label} label={control.label}
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemoved(control.type)}
          disabled={props.disabled[control.type]}/>
    ))}
    <button className={classes.order} disabled={!props.purchasable}
        onClick={props.ordering}>
      Order Now
    </button>
  </div>
);

export default buildControls;