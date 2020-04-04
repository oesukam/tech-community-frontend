import { currentUser as initialState } from '../store/initialState';
import * as types from '../actionTypes/currentUserTypes';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_IS_AUTH:
      return {
        ...state,
        isAuth: payload,
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: null,
        user: null,
      };
    case types.GET_USER_DETAILS:
      return {
        ...state,
        user: payload,
      };
    case types.GET_USER_DETAILS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
