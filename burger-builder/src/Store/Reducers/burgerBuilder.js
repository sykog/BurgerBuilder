import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
  lettuce: .5,
  cheese: .4,
  patty: 1.3,
  bacon: .7
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
}

const addIngredient = (state, action) => {
  const addedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
  const ingredients = updateObject(state.ingredients, addedIngredient);
  const updatedState = {
    ingredients: ingredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const removedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
  const ingredients = updateObject(state.ingredients, removedIngredient);
  const updatedState = {
    ingredients: ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
  }
  return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false
  });
}

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.INITIALIZE_INGREDIENTS_FAILED:
      return updateObject(state, {error:true});
    default: return state;
  }
}

export default burgerBuilder;