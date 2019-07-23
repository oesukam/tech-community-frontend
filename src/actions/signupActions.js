import server from '../Api/server';

import * as types from '../actionTypes/signupTypes';

/**
 * Updates the form inputs
 * @param {*} attribute
 * @return {object} action
 */
export const formInputChanged = attribute => ({
  type: types.SIGNUP_INPUT_CHANGED,
  payload: attribute,
});

/** Toggle the error to null
 * @return {object}
 */
export const noError = () => ({
  type: types.NO_ERROR,
});

/**
 * Triggers an action
 * when the sign up process starts
 * @return {object} action
 */
export const signupStarted = () => ({
  type: types.SIGNUP_STARTED,
});

/**
 * Triggers an action
 * when the sign up process succeed
 * @param {object} user
 * @return {object} action
 */
export const signupSuccess = user => ({
  type: types.SIGNUP_SUCCESS,
  payload: user,
});

/**
 * Triggers an action
 * when the sign up process fails
 * @param {object} error
 * @return {object} action
 */

export const signupError = error => ({
  type: types.SIGNUP_ERROR,
  payload: error,
});

/**
 * Register the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
export const signup = ({
  companyName,
  username,
  email,
  password,
}) => async dispatch => {
  dispatch(signupStarted());

  try {
    const res = await server.post(`/api/v1/auth/signup`, {
      companyName,
      username,
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem('token', token);

    dispatch(signupSuccess(user));
    return true;
  } catch (e) {
    if (e.response) {
      if (e.response.data.errors) {
        dispatch(
          signupError(`The password should have uppercase letters and numbers`),
        );
        return false;
      }
      dispatch(signupError(e.response.data.message));
      return false;
    }
    dispatch(signupError('Please check your internet connection'));
    return false;
  }
};
