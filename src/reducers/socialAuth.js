import * as types from '../actionTypes/socialAuth';

const reducer = (state = { show: false }, { type }) => {
  switch (type) {
    case types.SHOW_SOCIAL_AUTH:
      return {
        ...state,
        show: true,
      };
    case types.HIDE_SOCIAL_AUTH:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default reducer;
