import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../actionTypes/sharePostTypes';

const sharePostReducer = (state = {}, { type }) => {
  switch (type) {
    case SHARE_POST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SHARE_POST_SUCCESS:
      return {
        ...state,
      };
    case SHARE_POST_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default sharePostReducer;
