import * as actionTypes from './actionTypes';

export const startAuthentication = () => {
  return {
    type: actionTypes.START_AUTHENTICATION
  }
}

export const authenticateSuccess = () => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS
  }
}

export const authenticateFailed = () => {
  return {
    type: actionTypes.AUTHENTICATE_FAILED
  }
}

export const authenticate = (email, password) => {
  return dispatch => {
    dispatch(startAuthentication());
  }
}