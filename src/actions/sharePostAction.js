import server from '../Api/server';

import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../actionTypes/sharePostTypes';

export const sharePostStarted = () => ({
  type: SHARE_POST_STARTED,
});

export const sharePostSuccess = () => ({
  type: SHARE_POST_SUCCESS,
});

export const sharePostError = () => ({
  type: SHARE_POST_ERROR,
});

const share = data => async dispatch => {
  dispatch(sharePostStarted());
  const url = `/api/v1/posts/${data.postSlug}/share/${data.platform}`;
  try {
    await server.post(url);
    dispatch(sharePostSuccess());
  } catch (error) {
    dispatch(sharePostError());
  }
};

export default share;
