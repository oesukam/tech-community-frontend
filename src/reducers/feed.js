import * as types from '../actionTypes/feed';
import { FEED_LIMIT } from '../constants';

const reducer = (
  state = {
    items: [],
    loading: true,
    limit: 0,
    organizations: [],
  },
  { type, payload },
) => {
  switch (type) {
    case types.TOOGLE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case types.SET_FEED:
      return {
        ...state,
        items: [...new Set([...state.items, ...payload])],
        limit: state.limit + FEED_LIMIT,
      };
    case types.SET_FEED_ORGANIZATIONS:
      return {
        ...state,
        organizations: payload,
      };
    case types.CLEAR_FEED:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default reducer;
