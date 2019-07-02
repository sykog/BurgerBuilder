import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import axios from '../../axiosOrders';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false
  }

  componentDidMount() {
    this.props.onInitializeIngredients();
  }

  checkIfPurchasable = ingredients => {
    const sum = Object.keys(ingredients).map(ingredientName => {
      return ingredients[ingredientName];
    }).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);

    return sum > 0;
  }

  showOrderSummary = () => {
    this.setState({purchasing: true});
  }

  hideOrderSummary = () => {
    this.setState({purchasing: false});
  }

  continuePurchase = () => {
    this.props.history.push('/checkout');
  }


  render() {
    const disabledInfo = {...this.props.ingredients};
    for (let ingredientCount in disabledInfo) {
      disabledInfo[ingredientCount] = disabledInfo[ingredientCount] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved} disabled={disabledInfo}
              price={this.props.price} purchasable={this.checkIfPurchasable(this.props.ingredients)}
              ordering={this.showOrderSummary}/>
        </React.Fragment>
      );
      orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.price}
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    onInitializeIngredients: () => dispatch(actions.initializeIngredients())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));