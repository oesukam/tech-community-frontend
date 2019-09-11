import * as types from '../actionTypes/feed';
import { FEED_LIMIT } from '../constants';

const reducer = (
  state = { items: [], loading: true, limit: 0 },
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
        items: [...state.items, ...payload],
        limit: state.limit + FEED_LIMIT,
      };
    default:
      return state;
  }
};

export default reducer;
