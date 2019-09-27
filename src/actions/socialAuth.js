import * as types from '../actionTypes/currentUserTypes';

export const setIsAuth = () => ({
    type: types.SET_IS_AUTH,
    payload: true,
});

export const setCurrentUser = user => ({
    type: types.SET_CURRENT_USER,
    payload: user,
});

/**
 * Login the user
 * @param {*} { username, email, password }
 * @return {object} response
 */
export default (token, user) => async dispatch => {
    localStorage.setItem('token', token);
    dispatch(setIsAuth());
    dispatch(setCurrentUser(user));
    return true;
};
