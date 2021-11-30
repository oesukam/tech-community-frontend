import * as types from '../actionTypes/searchTypes';

/**
 * Set search state
 * @return {object} action
 */
export const setSearchState = (payload) => ({
  type: types.SET_SEARCH_STATE,
  payload,
});
