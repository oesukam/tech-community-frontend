import server from '../Api/server';

import * as types from '../actionTypes/loginTypes';

/** Toggle the error to null
 * @return {object}
 */
export const noError = () => ({
  type: types.NO_ERROR,
});

/**
 * Updates the form inputs
 * @param {*} attribute
 * @return {object} action
 */
export const formInputChanged = attribute => ({
  type: types.LOGIN_INPUT_CHANGED,
  payload: attribute,
});

/**
 * Triggers an action
 * when the process starts
 * @return {object} action
 */
export const loginStarted = () => ({
  type: types.LOGIN_STARTED,
});

/**
 * Triggers an action
 * when the process succeed
 * @param {object} user
 * @return {object} action
 */
export const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

/**
 * Triggers an action
 * when the process fails
 * @param {object} error
 * @return {object} action
 */

export const loginError = error => ({
  type: types.LOGIN_ERROR,
  payload: error,
});

/**
 * Login the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
export const login = ({ email, password }) => async dispatch => {
  dispatch(loginStarted());

  try {
    const res = await server.post(`/api/v1/auth/login`, {
      username: email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);

    dispatch(loginSuccess(user));
    return true;
  } catch (e) {
    if (e.response) {
      if (e.response.data.errors) {
        dispatch(loginError('Incorrect password'));
        return false;
      }
      dispatch(loginError(e.response.data.message));
      return false;
    }
    dispatch(loginError('Please check your internet connection'));
    return false;
  }
};
