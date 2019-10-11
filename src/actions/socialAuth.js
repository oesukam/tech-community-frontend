import * as types from '../actionTypes/currentUserTypes';
import { SHOW_SOCIAL_AUTH, HIDE_SOCIAL_AUTH } from '../actionTypes/socialAuth';
import server from '../Api/server';

export const setIsAuth = () => ({
  type: types.SET_IS_AUTH,
  payload: true,
});

export const setCurrentUser = user => ({
  type: types.SET_CURRENT_USER,
  payload: user,
});

export const showSocialAuth = user => ({
  type: SHOW_SOCIAL_AUTH,
  payload: user,
});

export const hideSocialAuth = user => ({
  type: HIDE_SOCIAL_AUTH,
  payload: user,
});

/**
 * Login the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
export default (token, user) => async dispatch => {
  localStorage.setItem('token', token);
  localStorage.setItem('username', user.user.username);
  dispatch(setIsAuth());
  dispatch(setCurrentUser(user));
  return true;
};

export const handleShowAndHide = show => dispatch => {
  if (show) dispatch(showSocialAuth());
  if (!show) dispatch(hideSocialAuth());
};

export const getUserDetails = username => async dispatch => {
  try {
    const {
      data: { profile },
    } = await server.get(`/api/v1/profiles/${username}`);
    dispatch({
      type: types.GET_USER_DETAILS,
      payload: profile,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_DETAILS_ERROR,
      payload: error,
    });
  }
};
