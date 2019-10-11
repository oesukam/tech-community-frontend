import {
  POST_COMMENT_ERROR,
  POST_COMMENT_STARTED,
  POST_COMMENT_SUCCESS,
  RESTORE_COMMENT_TICK,
} from '../actionTypes/postCommentTypes';

/**
 * Login reducer
 * @param {*} [state=auth]
 * @param {*} { type, payload }
 * @returns {object} updated state
 */
const postCommentReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case POST_COMMENT_STARTED:
      return {
        ...state,
        tick: false,
        loading: true,
      };
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        post: payload,
        tick: true,
        loading: false,
        error: false,
      };
    case POST_COMMENT_ERROR:
      return {
        ...state,
        loading: false,
        tick: false,
        error: payload,
        loggedIn: false,
      };
    case RESTORE_COMMENT_TICK:
      return {
        ...state,
        tick: false
      };
    default:
      return state;
  }
};

export default postCommentReducer;
