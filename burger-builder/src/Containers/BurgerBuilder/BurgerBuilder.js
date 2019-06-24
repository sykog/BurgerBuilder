import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
  salad: .5,
  cheese: .4,
  patty: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      patty: 0
    },
    totalPrice: 4
  }

  addIngredient = type => {
    const ingredientCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = ingredientCount;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: totalPrice,
      ingredients: updatedIngredients
    });
  }

  removeIngredient = type => {
    if (this.state.ingredients[type] <= 0) return;

    const ingredientCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = ingredientCount;
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({
      totalPrice: totalPrice,
      ingredients: updatedIngredients
    });
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let ingredientCount in disabledInfo) {
      disabledInfo[ingredientCount] = disabledInfo[ingredientCount] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredient} ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo}/>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;