import * as actionTypes from './actionTypes';

export const startAuthentication = () => {
  return {type: actionTypes.START_AUTHENTICATION};
};

export const authenticateSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTHENTICATE_SUCCESS,
    token: token,
    userId: userId
  };
};

export const authenticateFailed = error => {
  return {
    type: actionTypes.AUTHENTICATE_FAILED,
    error: error
  };
};

export const authenticate = (email, password, registering) => {
  return {
    type: actionTypes.AUTHENTICATE,
    email: email,
    password: password,
    registering: registering
  }
};

export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.CHECK_AUTH_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const checkAuthState = () => {
  return {type: actionTypes.CHECK_AUTH_STATE};
}

export const logout = () => {
  return {type: actionTypes.INITIALIZE_LOGOUT};
};

export const logoutSuccess = () => {
  return {type: actionTypes.LOG_OUT};
}