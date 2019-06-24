import React from 'react';
import BurgerIngredient from './BurgerIngredient'
import classes from './burger.css';

const burger = props => {
  return(
    <div className={classes.burger}>
      <BurgerIngredient type="bunTop"/>
      <BurgerIngredient type="cheese"/>
      <BurgerIngredient type="lettuce"/>
      <BurgerIngredient type="bacon"/>
      <BurgerIngredient type="patty"/>
      <BurgerIngredient type="bunBottom"/>
    </div>
  );
};

export default burger;