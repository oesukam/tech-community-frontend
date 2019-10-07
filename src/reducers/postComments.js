import * as types from '../actionTypes/postComments';

const reducer = (state = { loading: true }, { type, payload }) => {
  switch (type) {
    case types.TOGGLE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case types.SET_COMMENTS:
      return {
        ...state,
        items: payload,
      };
    default:
      return state;
  }
};

export default reducer;
