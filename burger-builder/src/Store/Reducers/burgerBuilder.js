import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../Functions/utility';

const INGREDIENT_PRICES = {
  beef: 2,
  chicken: 2,
  blackbean: 2,
  cheese: .5,
  bacon: 1,
  lettuce: .2,
  spinach: .3,
  onion: .4,
  tomato: .4,
  pickle: .4,
  pineapple: .4,
  ketchup: 0,
  mayo: 0,
  bbq: 0,
  mustard: 0,
  hotsauce: 0
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
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient.replace(/\s/g, '')]
  }
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const removedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] - 1};
  const ingredients = updateObject(state.ingredients, removedIngredient);
  const updatedState = {
    ingredients: ingredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient.replace(/\s/g, '')]
  }
  return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
  const ingredients = updateObject(state, {
    ingredients: updateObject(state.ingredients, action.ingredients),
    totalPrice: 2,
    error: false
  });
  return ingredients;
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