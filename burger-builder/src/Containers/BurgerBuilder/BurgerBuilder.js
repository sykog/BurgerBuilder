import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import axios from '../../axiosOrders';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Model from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'

export const BurgerBuilder = props => {

  const [purchasing, setPurchasing] = useState(false);
  const [loading] = useState(false);

  useEffect(() => {
    if (!props.ingredients) props.onInitializeIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfPurchasable = ingredients => {
    const sum = Object.keys(ingredients).map(ingredientName => {
      return ingredients[ingredientName];
    }).reduce((sum, ingredientCount) => {
      return sum + ingredientCount;
    }, 0);

    return sum > 0;
  };

  const showOrderSummary = () => setPurchasing(true);
  const hideOrderSummary = () => setPurchasing(false);

  const continuePurchase = () => {
    props.onInitializeCheckout();
    props.history.push('/checkout');
  };

  const disabledInfo = {...props.ingredients};
  for (let ingredientCount in disabledInfo) {
    disabledInfo[ingredientCount] = disabledInfo[ingredientCount] <= 0;
  }
  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

  if (props.ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ingredients}/>
        <BuildControls ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved} disabled={disabledInfo}
            price={props.price} purchasable={checkIfPurchasable(props.ingredients)}
            ordering={showOrderSummary}/>
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary ingredients={props.ingredients} price={props.price}
          cancel={hideOrderSummary} continue={continuePurchase}/>
    );
  }
  if (loading) orderSummary = <Spinner/>;

  return (
    <React.Fragment>
      <Model show={purchasing} modalClosed={hideOrderSummary}>
        {orderSummary}
      </Model>
      {burger}
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
    onInitializeIngredients: () => dispatch(actions.initializeIngredients()),
    onInitializeCheckout: () => dispatch(actions.initializeCheckout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));