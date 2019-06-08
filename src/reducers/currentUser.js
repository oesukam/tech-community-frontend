import { currentUser as initialState } from '../store/initialState';
import * as types from '../actionTypes/currentUserTypes';

const reducer = (state = initialState, { type, payload }) => {
  switch (types) {
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
    default:
      return state;
  }
};

export default reducer;
