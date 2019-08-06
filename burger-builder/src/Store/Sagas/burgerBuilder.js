import {put} from 'redux-saga/effects';
import * as actions from '../Actions/index';
import axios from "../../axiosOrders";

export function* initializeIngredientsSaga(action) {
  try {
    const response1 = yield axios.get('ingredients/patty.json');
    const response2 = yield axios.get('ingredients/toppings.json');
    const response3 = yield axios.get('ingredients/sauces.json');
    const response = {...response1.data, ...response2.data, ...response3.data}
    yield put(actions.setIngredients(response));
  } catch (error) {
    yield put(actions.initializeIngredientsFailed());
  }
}