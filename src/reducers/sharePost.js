import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../actionTypes/sharePostTypes';

const sharePostReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SHARE_POST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SHARE_POST_SUCCESS:
      return {
        ...state,
        response: payload.res,
      };
    case SHARE_POST_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default sharePostReducer;
