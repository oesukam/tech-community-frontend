import server from '../Api/server';

import * as types from '../actionTypes/feed';

import { FEED_LIMIT } from '../constants';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = state => ({
  type: types.TOOGLE_LOADING,
  payload: state,
});

/**
 * Set feed
 * @return {object} action
 */
export const setFeed = feed => ({
  type: types.SET_FEED,
  payload: feed,
});

/**
 * Get feed
 * @return {object} response
 */
export const getFeed = (limit, itemsLength) => async dispatch => {
  if (limit > itemsLength + FEED_LIMIT) return;

  dispatch(toggleLoading(true));

  try {
    const {
      data: { feed },
    } = await server.get(
      `/api/v1/feed?offset=${itemsLength}&&limit=${FEED_LIMIT}`,
    );

    dispatch(setFeed(feed));
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
