import React from 'react';
import PropTypes from 'prop-types';
import bunTop from '../../Assets/Images/bun-top.png';
import bunBottom from '../../Assets/Images/bun-bottom.png';
import beef from '../../Assets/Images/patty.png';
import chicken from '../../Assets/Images/chicken.png';
import blackBean from '../../Assets/Images/blackBean.png';
import bacon from '../../Assets/Images/bacon.png';
import cheese from '../../Assets/Images/cheese.png';
import lettuce from '../../Assets/Images/lettuce.png';
import spinach from '../../Assets/Images/spinach.png';
import onion from '../../Assets/Images/onion.png';
import tomato from '../../Assets/Images/tomato.png';
import pickle from '../../Assets/Images/pickle.png';
import pineapple from '../../Assets/Images/pineapple.png';
import classes from './burgerIngredients.css';

const BurgerIngredient = props => {
  let ingredient = null;
  console.log(props);

  switch (props.type) {
    case('bunBottom'):
      ingredient = <img className={classes.ingredient} src={bunBottom} alt="bun bottom"/>;
      break;
    case('bunTop'):
      ingredient = <img className={classes.ingredient} src={bunTop} alt="bun top"/>;
      break;
    case('beef'):
      ingredient = <img className={classes.ingredient} src={beef} alt="beef"/>;
      break;
    case('chicken'):
      ingredient = <img className={classes.ingredient} src={chicken} alt="chicken"/>;
      break;
    case('black bean'):
      ingredient = <img className={classes.ingredient} src={blackBean} alt="black bean"/>;
      break;
    case('cheese'):
      ingredient = <img className={classes.ingredient} src={cheese} alt="cheese"/>;
      break;
    case('lettuce'):
      ingredient = <img className={classes.ingredient} src={lettuce} alt="lettuce"/>;
      break;
    case('spinach'):
      ingredient = <img className={classes.ingredient} src={spinach} alt="spinach"/>;
      break;
    case('onion'):
      ingredient = <img className={classes.ingredient} src={onion} alt="onion"/>;
      break;
    case('tomato'):
      ingredient = <img className={classes.ingredient} src={tomato} alt="tomato"/>;
      break;
    case('pickle'):
      ingredient = <img className={classes.ingredient} src={pickle} alt="pickle"/>;
      break;
    case('pineapple'):
      ingredient = <img className={classes.ingredient} src={pineapple} alt="pineapple"/>;
      break;
    case('bacon'):
      ingredient = <img className={classes.ingredient} src={bacon} alt="bacon"/>;
      break;
    case('hot sauce'):
      ingredient = <div className={[classes.ingredient, classes.hotsauce].join(' ')}/>;
      break;
    default:
      ingredient = <div className={[classes.ingredient, classes[props.type]].join(' ')}/>;
  }
  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;