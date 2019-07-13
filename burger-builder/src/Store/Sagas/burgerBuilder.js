import {put} from 'redux-saga/effects';
import * as actions from '../Actions/index';
import axios from "../../axiosOrders";

export function* initializeIngredientsSaga(action) {
  try {
    const response = yield axios.get('ingredients.json');
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.initializeIngredientsFailed());
  }
}