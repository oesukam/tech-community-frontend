import server from '../Api/server';

import * as types from '../actionTypes/sharePostTypes';

export const sharePostStarted = () => ({
  type: types.SHARE_POST_STARTED,
});

export const sharePostSuccess = () => ({
  type: types.SHARE_POST_SUCCESS,
});

export const sharePostError = () => ({
  type: types.SHARE_POST_ERROR,
});

/**
 * Update post share information
 * @param {object} field
 * @param {object} value
 * @return {object} action
 */
export const setSharePostContent = payload => ({
  type: types.SET_SHARE_POST_CONTENT,
  payload,
});

/**
 * Clear post share information
 * @return {object} action
 */
export const clearSharePostContent = () => ({
  type: types.CLEAR_SHARE_POST_CONTENT,
});

/**
 * Show share post
 * @return {object} action
 */
export const handleShowSharePost = () => ({
  type: types.CLEAR_SHARE_POST_CONTENT,
});

export const sharePost = ({ url, platform }) => async dispatch => {
  dispatch(sharePostStarted());
  try {
    await server.post(`${url}/share/${platform}`);
    dispatch(sharePostSuccess());
    dispatch(handleShowSharePost());
  } catch (error) {
    dispatch(sharePostError());
  }
};
