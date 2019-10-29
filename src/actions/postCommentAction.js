import server from '../Api/server';
import {
  POST_COMMENT_ERROR,
  POST_COMMENT_STARTED,
  POST_COMMENT_SUCCESS,
  RESTORE_COMMENT_TICK,
} from '../actionTypes/postCommentTypes';
import { getPostComments } from './postComments';

/**
 * Triggers an action
 * when the process starts
 * @return {object} action
 */
const postCommentStarted = () => ({ type: POST_COMMENT_STARTED });

/**
 * Triggers an action
 * when the process succeed
 * @param {object} post
 * @return {object} action
 */
const postCommentSuccess = (post) => ({
  type: POST_COMMENT_SUCCESS,
  payload: post,
});

/**
 * Triggers an action
 * when the process fails
 * @param {object} error
 * @return {object} action
 */
const postError = (error) => ({
  type: POST_COMMENT_ERROR,
  payload: error,
});

/**
 * Triggers an action
 * when the post has been succeessful
 * to restore the tick
 * @return {object} action
 */
const restoreTick = () => ({ type: RESTORE_COMMENT_TICK });

/**
 * post
 * @param {*} { username, email, password }
 * @return {object} response
 */
const postCommentAction = ({ slug, value: body }) => async (dispatch) => {
  dispatch(postCommentStarted());

  try {
    const payload = {
      body,
    };

    const res = await server.post(`/posts/${slug}/comments`, payload);

    const { post } = res.data;
    dispatch(postCommentSuccess(post));
    dispatch(getPostComments(slug));

    setTimeout(() => {
      dispatch(restoreTick());
    }, 3000);
    return true;
  } catch (e) {
    if (e.response) {
      dispatch(postError(e.response.data.message));
      return false;
    }
    dispatch(postError('Please check your internet connection'));
    return false;
  }
};

export default postCommentAction;
