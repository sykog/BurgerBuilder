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
        console.log(response);
        dispatch(authenticateSuccess(response.data.idToken, response.data.localId));
    }).catch(error => {
        console.log(error);
        dispatch(authenticateFailed(error));
    });
  }
}