import server from '../Api/server';
import * as types from '../actionTypes/postComments';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = (state) => ({
  type: types.TOGGLE_LOADING,
  payload: state,
});

/**
 * Set comments
 * @return {object} action
 */
export const setComments = (comments) => ({
  type: types.SET_COMMENTS,
  payload: comments,
});

/**
 * Get comments
 * @return {object} response
 */
export const getPostComments = (postSlug) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    const {
      data: { postComments },
    } = await server.get(`/posts/${postSlug}/Comments`);

    dispatch(setComments(postComments));
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
