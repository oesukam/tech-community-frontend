import server from '../Api/server';

import * as types from '../actionTypes/feed';

import { FEED_LIMIT } from '../constants';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = (state) => ({
  type: types.TOOGLE_LOADING,
  payload: state,
});

/**
 * Set feed
 * @return {object} action
 */
export const setFeed = (payload) => ({
  type: types.SET_FEED,
  payload,
});

/**
 * Set feed organization
 * @return {object} action
 */
export const setFeedOrganizations = (payload) => ({
  type: types.SET_FEED_ORGANIZATIONS,
  payload,
});

/**
 * Get feed
 * @return {object} response
 */
export const getFeed = ({
  limit,
  itemsLength,
  category = 'general',
  search = '',
}) => async (dispatch) => {
  if (limit > itemsLength + FEED_LIMIT) return;

  dispatch(toggleLoading(true));

  try {
    const {
      data: { feed },
    } = await server.get(
      `/api/v1/feed?offset=${itemsLength}&limit=${FEED_LIMIT}&category=${category}&search=${search}`,
    );

    dispatch(setFeed(feed));
    dispatch(toggleLoading(false));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};


/**
 * Get feed
 * @return {object} response
 */
export const getFeedOrganizations = () => async (dispatch) => {
  const res = await server.get(
    '/api/v1/organizations?limit=5',
  );
  if (res) {
    const {
      data: { organizations },
    } = res;
    dispatch(setFeedOrganizations(organizations.docs || []));
  }
};
