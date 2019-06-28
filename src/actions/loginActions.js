import axios from 'axios';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_STARTED,
  LOGIN_INPUT_CHANGED,
} from '../actionTypes/loginTypes';

/**
 * Updates the form inputs
 * @param {*} attribute
 * @return {object} action
 */
export const formInputChanged = attribute => ({
  type: LOGIN_INPUT_CHANGED,
  payload: attribute,
});

/**
 * Triggers an action
 * when the process starts
 * @return {object} action
 */
export const loginStarted = () => ({
  type: LOGIN_STARTED,
});

/**
 * Triggers an action
 * when the process succeed
 * @param {object} user
 * @return {object} action
 */
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

/**
 * Triggers an action
 * when the process fails
 * @param {object} error
 * @return {object} action
 */

export const loginError = error => ({
  type: LOGIN_ERROR,
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
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
      {
        username: email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { token, user } = res.data;

    localStorage.setItem('token', token);

    dispatch(loginSuccess(user));
    return true;
  } catch (e) {
    if (e.response) {
      if (e.response.data.errors) {
        dispatch(loginError(e.response.data.errors[0].message));
        return false;
      }
      dispatch(loginError(e.response.data.message));
      return false;
    }
    dispatch(loginError('Please check your internet connection'));
    return false;
  }
};
