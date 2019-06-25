import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  lettuce: .5,
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
    totalPrice: 4,
    purchasable: false,
    purchasing: false
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
    this.checkIfPurchasable(updatedIngredients);
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
    this.checkIfPurchasable(updatedIngredients);
  }

  checkIfPurchasable = ingredients => {
    const sum = Object.keys(ingredients).map(ingredientName => {
      return ingredients[ingredientName];
    }).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);

    this.setState({purchasable: sum > 0});
  }

  showOrderSummary = () => {
    this.setState({purchasing: true});
  }

  hideOrderSummary = () => {
    this.setState({purchasing: false});
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let ingredientCount in disabledInfo) {
      disabledInfo[ingredientCount] = disabledInfo[ingredientCount] <= 0;
    }

    return (
      <React.Fragment>
        <Model show={this.state.purchasing} modalClosed={this.hideOrderSummary}>
          <OrderSummary ingredients={this.state.ingredients}/>
        </Model>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredient} ingredientRemoved={this.removeIngredient}
            disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}
            ordering={this.showOrderSummary}/>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;