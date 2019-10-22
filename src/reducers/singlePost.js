import * as types from '../actionTypes/singlePostTypes';


const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.FETCH_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    case types.FETCH_RELATED_POSTS:
      return {
        ...state,
        relatedPosts: payload,
      };
    default:
      return state;
  }
};

export default reducer;
