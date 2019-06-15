import axios from 'axios';
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
  SIGNUP_INPUT_CHANGED,
} from '../actionTypes/signupTypes';

/**
 * Updates the form inputs
 * @param {*} attribute
 * @return {object} action
 */
export const formInputChanged = attribute => ({
  type: SIGNUP_INPUT_CHANGED,
  payload: attribute,
});

/**
 * Triggers an action
 * when the sign up process starts
 * @return {object} action
 */
export const signupStarted = () => ({
  type: SIGNUP_STARTED,
});

/**
 * Triggers an action
 * when the sign up process succeed
 * @param {object} user
 * @return {object} action
 */
export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

/**
 * Triggers an action
 * when the sign up process fails
 * @param {object} error
 * @return {object} action
 */

export const signupError = error => ({
  type: SIGNUP_ERROR,
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
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
      {
        companyName,
        username,
        email,
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
