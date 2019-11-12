import server from '../Api/server';
import * as types from '../actionTypes/usersTypes';

/**
 * Toggles the loading state
 * @return {object} action
 */
export const toggleLoading = (state) => ({
  type: types.TOGGLE_LOADING,
  payload: state,
});

/**
 * Set users
 * @return {object} action
 */
export const setUsers = (users) => ({
  type: types.SET_USERS,
  payload: users,
});

/**
 * `Fetch users`
 * @return {object} action
 */
export const getLatestUsers = () => async (dispatch) => {
  dispatch(toggleLoading(true));

  try {
    const { data: { profiles: users } } = await server.get('/profiles');
    dispatch(toggleLoading(false));
    dispatch(setUsers(users));
  } catch (e) {
    dispatch(toggleLoading(false));
  }
};
