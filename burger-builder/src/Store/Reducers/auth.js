import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../../Shared/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authenticateSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_AUTHENTICATION:
      return updateObject(state, {error: null, loading: true});
    case actionTypes.AUTHENTICATE_SUCCESS:
      return authenticateSuccess(state, action);
    case actionTypes.AUTHENTICATE_FAILED:
      return updateObject(state, {error: action.error, loading: false});
    case actionTypes.LOG_OUT:
      return updateObject(state, {token: null, userId: null});
    default: return state;
  }
};

export default reducer;