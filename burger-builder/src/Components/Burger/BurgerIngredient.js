import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './burgerIngredients.css';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case('bunBottom'):
        ingredient = <div className={classes.bunBottom}></div>;
        break;
      case('bunTop'):
        ingredient = (
          <div className={classes.bunTop}>
            <div className={classes.seeds1}></div>
            <div className={classes.seeds2}></div>
          </div>
        );
        break;
      case('patty'):
        ingredient = <div className={classes.patty}></div>;
        break;
      case('cheese'):
        ingredient = <div className={classes.cheese}></div>;
        break;
      case('lettuce'):
        ingredient = <div className={classes.lettuce}></div>;
        break;
      case('bacon'):
        ingredient = <div className={classes.bacon}></div>;
        break;
      default:
        ingredient = null;
    }

    return ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;