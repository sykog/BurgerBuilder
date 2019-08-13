import reducer from './burgerBuilder';
import * as actionTypes from '../Actions/actionTypes';

describe('burger builder reducer', () => {
  it('should add the to the price when an ingredient is added', () => {
    expect(reducer({
      ingredients: {beef: 0},
      totalPrice: 2,
      error: false
    }, {
      type: actionTypes.ADD_INGREDIENT,
      ingredient: "beef"
    })).toEqual({
      ingredients: {beef: 1},
      totalPrice: 4,
      error: false
    });
  });
});