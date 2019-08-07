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

const buildControls = props => {

  const disabledAdd = {...props.ingredients};
  const disabledRemove = {...props.ingredients};

  for (let ingredientCount in disabledAdd) {
    let label = '';
    controlsList.forEach(controlType => {
      if (controlType.types.includes(ingredientCount)) label = controlType.label;
    });

    switch (label) {
      case 'patty':
        disabledAdd[ingredientCount] = disabledAdd[ingredientCount] > 1;
        break;
      case 'toppings':
        disabledAdd[ingredientCount] = disabledAdd[ingredientCount] > 1;
        break;
      case 'sauces':
        disabledAdd[ingredientCount] = disabledAdd[ingredientCount] >= 1;
        break;
      default:
        return;
    }
    disabledRemove[ingredientCount] = disabledRemove[ingredientCount] <= 0;
  }

  return (
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
                            addDisabled={disabledAdd[ingredient]} removeDisabled={disabledRemove[ingredient]}/>
            ))}
          </div>
        ))}
      </div>

      <button className={classes.order} disabled={!props.purchasable}
          onClick={props.ordering}>Order Now</button>
    </div>
  )
};

export default buildControls;