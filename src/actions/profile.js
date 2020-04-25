import {
  RESET_CURRENT_FETCHED_MEMBER,
  GET_USER_FOLLOWERS_DETAILS,
  GET_USER_DETAILS_ERROR,
  VERYFY_FOLLOW_STATUS,
} from '../actionTypes/currentUserTypes';
import {
  FOLLOW_USER, UNFOLLOW_USER, FOLLOW_USER_ERROR, UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
} from '../actionTypes/profileTypes';

import server from '../Api/server';

export const resetFetchedMemberProfile = () => (dispatch) => {
  dispatch({ type: RESET_CURRENT_FETCHED_MEMBER });
};

export const followUnflowUser = (reqType = FOLLOW_USER, sername = '') => (dispatch) => {
  try {
    if (reqType === FOLLOW_USER) {
      server
        .post(`/follow/${sername}`)
        .then((res) => {
          dispatch({
            type: FOLLOW_USER,
            payload: res.data,
          });
        });
    }

    if (reqType === UNFOLLOW_USER) {
      server
        .delete(`/follow/${sername}`)
        .then((res) => {
          dispatch({
            type: UNFOLLOW_USER,
            payload: res.data,
          });
        });
    }
  } catch (e) {
    dispatch({
      FOLLOW_USER_ERROR,
      payload: e.response.data,
    });
  }
};

export const updateProfile = (username, profileData) => (dispatch) => {
  server
    .put(`/profiles/${username}`, profileData)
    .then((res) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.profile,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: error.response.data,
      });
    });
};

export const getUserFollowersDetails = (
  username, isCurrentUsersProfile, page = 1,
) => async (dispatch) => {
  try {
    const res = await server.get(`/profiles/${username}/followers?page=${page}`);
    dispatch({
      type: GET_USER_FOLLOWERS_DETAILS,
      payload: {
        followersDetails: res.data,
        isCurrentUsersProfile,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_USER_DETAILS_ERROR,
      payload: error,
    });
  }
};

export const checkFollowActivity = (username) => async (dispatch) => {
  try {
    await server.get(`/follow/${username}/verify`);
    dispatch({
      type: VERYFY_FOLLOW_STATUS,
      payload: true,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      dispatch({
        type: VERYFY_FOLLOW_STATUS,
        payload: false,
      });
    } else {
      dispatch({
        type: GET_USER_DETAILS_ERROR,
        payload: error,
      });
    }
  }
};
