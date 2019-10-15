import * as types from '../actionTypes/searchTypes';
import { search as initialState } from '../store/initialState';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_SEARCH_STATE:
      return {
        ...state,
        searchState: payload,
      };
    case types.SET_SEARCH_KEYWORDS:
      return {
        ...state,
        searchKeywords: payload,
      };
    case types.SET_RECOMMENDATIONS:
      return {
        ...state,
        searchRecommendations: payload,
      };

    case types.SET_SEARCH_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default reducer;
