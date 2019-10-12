import server from '../Api/server';

import { toggleLoading } from './feedActions';

/**
 * Like a post
 * @return {object} action
 */
export const like = (postSlug) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    await server.post(`/api/v1/posts/${postSlug}/like`);
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};

/**
 * Unlike a post
 * @return {object} action
 */
export const unlike = (postSlug) => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    await server.delete(`/api/v1/posts/${postSlug}/like`);
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
