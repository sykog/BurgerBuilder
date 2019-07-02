import * as actionTypes from './actionTypes';
import axios from "../../axiosOrders";

export const initializeIngredients = () => {
  return dispatch => {
    axios.get('ingredients.json').then(response => {
      dispatch(setIngredients(response.data));
    }).catch(error => {
      dispatch(initializeIngredientsFailed());
    });
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const initializeIngredientsFailed = () => {
  return {
    type: actionTypes.INITIALIZE_INGREDIENTS_FAILED
  };
};

export const addIngredient = ingredient => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingredient
  };
};

export const removeIngredient = ingredient => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient
  };
};