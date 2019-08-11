import initialState from '../store/initialState';
import * as types from '../actionTypes/signupTypes';

/**
 * Signup reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const signupReducer = (state = initialState.auth, { type, payload }) => {
  switch (type) {
    case types.NO_ERROR:
      return {
        ...state,
        error: false,
      };
    case types.SIGNUP_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        loggedIn: true,
      };
    case types.SIGNUP_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        loggedIn: false,
      };
    case types.SIGNUP_INPUT_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          [payload.name]: payload.value,
        },
      };
    default:
      return state;
  }
};

export default signupReducer;
