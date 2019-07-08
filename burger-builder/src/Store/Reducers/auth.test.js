import reducer from './auth';
import * as actionTypes from '../Actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    });
  });

  it('should store the token when logged in', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false
    }, {
      type: actionTypes.AUTHENTICATE_SUCCESS,
      token: 'token',
      userId: 'id',
      error: null,
      loading: false
    })).toEqual({
      token: 'token',
      userId: 'id',
      error: null,
      loading: false
    });
  });
});