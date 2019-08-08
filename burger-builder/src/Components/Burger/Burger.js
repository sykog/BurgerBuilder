import React from 'react';
import {withRouter} from 'react-router-dom';
import BurgerIngredient from './BurgerIngredient'
import classes from './burger.css';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients).map(ingredientName => {
    return [...Array(props.ingredients[ingredientName])].map((_, quantity) => (
      <BurgerIngredient key={ingredientName + quantity} type={ingredientName}/>
    ));
  }).reduce((ingredients, ingredient) => {
    return ingredients.concat(ingredient)
  }, []);

  // show patties on bottom
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  } else {
    let counter = 0;
    while (transformedIngredients[0].props.type.match("(beef|chicken|black bean).*")) {
      transformedIngredients.push(transformedIngredients.shift());
      if (counter++ >= transformedIngredients.length) break;
    }
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bunTop"/>
      {transformedIngredients}
      <BurgerIngredient type="bunBottom"/>
    </div>
  );
};

export default withRouter(burger);