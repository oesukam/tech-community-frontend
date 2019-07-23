import * as types from '../actionTypes/loginTypes';

/**
 * Login reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const loginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.NO_ERROR:
      return {
        ...state,
        error: false,
      };
    case types.LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        loggedIn: true,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        loggedIn: false,
      };
    case types.LOGIN_INPUT_CHANGED:
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

export default loginReducer;
