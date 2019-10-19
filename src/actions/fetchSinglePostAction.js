import server from '../Api/server';

import * as types from '../actionTypes/singlePostTypes';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = (state) => ({
  type: types.TOGGLE_LOADING,
  payload: state,
});

/**
 * Set feed
 * @return {object} action
 */
export const fetchSuccess = (post) => ({
  type: types.FETCH_SUCCESS,
  payload: post,
});

/**
 * Get feed
 * @return {object} response
 */
export default (slug) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    const {
      data: { post },
    } = await server.get(
      `/posts/${slug}`,
    );

    dispatch(fetchSuccess(post));
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
