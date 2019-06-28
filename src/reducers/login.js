import initialState from '../store/initialState';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_STARTED,
  LOGIN_INPUT_CHANGED,
} from '../actionTypes/loginTypes';

/**
 * Login reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const loginReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        error: false,
        loggedIn: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        loggedIn: false,
      };
    case LOGIN_INPUT_CHANGED:
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
