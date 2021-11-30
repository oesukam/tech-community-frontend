import * as types from '../actionTypes/sharePostTypes';
import { sharePost as initialState } from '../store/initialState';

const sharePostReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SHARE_POST_STARTED:
      return {
        ...state,
        loading: true,
      };
    case types.SHARE_POST_SUCCESS:
      return {
        ...state,
        message: payload.message,
      };
    case types.SHARE_POST_ERROR:
      return {
        ...state,
        error: payload ? payload.error || payload.message : '',
      };
    case types.SET_SHARE_POST_CONTENT:
      return {
        ...state,
        content: payload,
        show: true,
      };
    case types.CLEAR_SHARE_POST_CONTENT:
      return {
        ...state,
        content: initialState.content,
        show: false,
      };
    default:
      return state;
  }
};

export default sharePostReducer;
