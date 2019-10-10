import { LOGOUT_SUCCESS } from '../actionTypes/currentUserTypes';

export const setIsLoggedOut = () => dispatch => {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  return dispatch({
    type: LOGOUT_SUCCESS,
    payload: true,
  });
};
