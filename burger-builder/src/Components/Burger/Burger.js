import React from 'react';
import BurgerIngredient from './BurgerIngredient'
import classes from './burger.css';

const burger = props => {

  // transform the ingredients object into an array of jsx tags
  // reduce wil count each ingredient by quantity
  let transformedIngredients = Object.keys(props.ingredients).map(ingredientName => {
    return [...Array(props.ingredients[ingredientName])].map( (_, quantity)=> {
      return <BurgerIngredient key={ingredientName + quantity} type={ingredientName}/>
    });
  }).reduce((ingredients, ingredient) => {
    return ingredients.concat(ingredient)
  }, []);
  if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Please start adding ingredients!</p>
  }
  console.log(transformedIngredients);

  return(
    <div className={classes.burger}>
      <BurgerIngredient type="bunTop"/>
      {transformedIngredients}
      <BurgerIngredient type="bunBottom"/>
    </div>
  );
};

export default burger;