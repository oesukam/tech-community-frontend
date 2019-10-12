import {
  POST_ERROR,
  POST_SUCCESS,
  POST_STARTED,
  RESTORE_TICK,
} from '../actionTypes/postTypes';

/**
 * Login reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const postReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case POST_STARTED:
      return {
        ...state,
        tick: false,
        loading: true,
      };
    case POST_SUCCESS:
      return {
        ...state,
        post: payload,
        tick: true,
        loading: false,
        error: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        tick: false,
        error: payload,
        loggedIn: false,
      };
    case RESTORE_TICK:
      return {
        ...state,
        tick: false,
      };
    default:
      return state;
  }
};

export default postReducer;
