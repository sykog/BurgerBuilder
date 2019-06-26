import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'
import axios from '../../axiosOrders';

const INGREDIENT_PRICES = {
  lettuce: .5,
  cheese: .4,
  patty: 1.3,
  bacon: .7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('ingredients.json').then(response => {
      this.setState({ingredients: response.data});
    }).catch(error => {
      this.setState({error: true});
    });
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

  continuePurchase = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Antonio Suarez',
        address: {
          street: '12345 5th St SE',
          zip: '90000'
        },
        email: 'asuarez@mail.com'
      }
    }
    axios.post('orders.json', order).then(response => {
      this.setState({loading: false, purchasing: false});
    }).catch(error => {
      console.log(error);
      this.setState({loading: false, purchasing: false});
    });
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let ingredientCount in disabledInfo) {
      disabledInfo[ingredientCount] = disabledInfo[ingredientCount] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls ingredientAdded={this.addIngredient} ingredientRemoved={this.removeIngredient}
              disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable}
              ordering={this.showOrderSummary}/>
        </React.Fragment>
      );
      orderSummary = <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
                                   cancel={this.hideOrderSummary} continue={this.continuePurchase}/>;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>;
    }

    return (
      <React.Fragment>
        <Model show={this.state.purchasing} modalClosed={this.hideOrderSummary}>
          {orderSummary}
        </Model>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);