import * as actionTypes from '../Actions/actionTypes';

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

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
    case actionTypes.INITIALIZE_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    default: return state;
  }
}

export default burgerBuilder;