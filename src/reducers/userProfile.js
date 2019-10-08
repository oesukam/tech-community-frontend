import {
  CHANGE_IMAGE_STARTED,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
} from '../actionTypes/userProfileTypes';

const userProfileReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CHANGE_IMAGE_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CHANGE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case CHANGE_IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default userProfileReducer;
