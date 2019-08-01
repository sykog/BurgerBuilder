import React from 'react';
import PropTypes from 'prop-types';
import bunTop from '../../Assets/Images/bun-top.png';
import bunBottom from '../../Assets/Images/bun-bottom.png';
import patty from '../../Assets/Images/patty.png';
import bacon from '../../Assets/Images/bacon.png';
import lettuce from '../../Assets/Images/lettuce.png';
import cheese from '../../Assets/Images/cheese.png';
import classes from './burgerIngredients.css';

const BurgerIngredient = props => {
  let ingredient = null;

  switch (props.type) {
    case('bunBottom'):
      ingredient = <img className={classes.ingredient} src={bunBottom} alt="bun bottom"/>;
      break;
    case('bunTop'):
      ingredient = (
        <img className={classes.ingredient} src={bunTop} alt="bun top"/>
      );
      break;
    case('patty'):
      ingredient = <img className={classes.ingredient} src={patty} alt="patty"/>;
      break;
    case('cheese'):
      ingredient = <img className={classes.ingredient} src={cheese} alt="cheese"/>;
      break;
    case('lettuce'):
      ingredient = <img className={classes.ingredient} src={lettuce} alt="lettuce"/>;
      break;
    case('bacon'):
      ingredient = <img className={classes.ingredient} src={bacon} alt="bacon"/>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;