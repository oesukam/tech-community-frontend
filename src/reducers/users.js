import * as types from '../actionTypes/usersTypes';
import { LATEST_USERS_LIMIT } from '../constants';

const reducer = (state = { items: [], loading: false }, { type, payload }) => {
  switch (type) {
    case types.SET_USERS:
      return {
        ...state,
        items: payload.splice(0, LATEST_USERS_LIMIT),
      };
    case types.TOGGLE_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default reducer;
