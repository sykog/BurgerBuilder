import * as actionTypes from './actionTypes';
import axios from 'axios';

export const startAuthentication = () => {
  return {
    type: actionTypes.START_AUTHENTICATION
  };
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
  return dispatch => {
    dispatch(startAuthentication());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
      'AIzaSyCuXjO_ZbysKPVTw_hTPpy4DgZdFf1ZIiU';
    if (!registering) url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
      'AIzaSyCuXjO_ZbysKPVTw_hTPpy4DgZdFf1ZIiU';

    axios.post(url, authData).then(response => {
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authenticateSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    }).catch(error => {
      dispatch(authenticateFailed(error.response.data.error));
    });
  }
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        const timeDifference = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authenticateSuccess(token, userId));
        dispatch(checkAuthTimeout(timeDifference));
      } else {
        dispatch(logout());
      }
    }
  }
}

export const logout = () => {
  /*localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');*/
  return {
    type: actionTypes.INITIALIZE_LOGOUT
  };
};