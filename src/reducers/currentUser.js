import { currentUser as initialState } from '../store/initialState';
import * as types from '../actionTypes/currentUserTypes';
import {
  FOLLOW_USER, UNFOLLOW_USER,
  FOLLOW_USER_ERROR,
  UPDATE_PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../actionTypes/profileTypes';

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
        user: payload.user,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: null,
        user: null,
      };

    case types.VERYFY_FOLLOW_STATUS:
      return {
        ...state,
        membersProfile: { ...state.membersProfile, isFollowed: payload },
      };
    case types.GET_USER_DETAILS:
      return payload.isCurrentUsersProfile ? {
        ...state,
        user: payload.profile,
      } : {
        ...state,
        membersProfile: payload.profile,
      };
    case types.GET_USER_FOLLOWERS_DETAILS:
      return payload.isCurrentUsersProfile ? {
        ...state,
        user: {
          ...state.user,
          followers: payload.followersDetails.followers,
          following: payload.followersDetails.following,
          followingPage: !state.user.followingPage
            ? 1 : state.user.followingPage + 1,
        },
      } : {
        ...state,
        membersProfile: {
          ...state.membersProfile,
          followers: payload.followersDetails.followers,
          following: payload.followersDetails.following,
          followingPage: !state.membersProfile.followingPage
            ? 1 : state.membersProfile.followingPage + 1,
        },
      };
    case types.GET_USER_DETAILS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case types.RESET_CURRENT_FETCHED_MEMBER:
      return {
        ...state,
        membersProfile: { username: null },
      };
    case FOLLOW_USER:
      return {
        ...state,
        membersProfile: {
          ...state.membersProfile,
          isFollowed: true,
        },
        user: {
          ...state.user,
          following: [...state.user.following, { user: [state.membersProfile] }],
          followedCount: state.user.followedCount + 1,
        },
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        membersProfile: {
          ...state.membersProfile,
          isFollowed: false,
        },
        user: {
          ...state.user,
          following: state.user.following.filter(
            (person) => person.user[0].username !== state.membersProfile.username,
          ),
          followedCount: state.user.followedCount - 1,
        },
      };
    case FOLLOW_USER_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...payload,
          followers: state.user.followers,
          following: state.user.following,
          followingPage: state.user.followingPage,
        },
      };
    default:
      return state;
  }
};

export default reducer;
