import server from '../Api/server';

import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../actionTypes/sharePostTypes';

const sharePostStarted = () => ({
  type: SHARE_POST_STARTED,
});

const sharePostSuccess = res => ({
  type: SHARE_POST_SUCCESS,
  payload: { res },
});

const sharePostError = error => ({
  type: SHARE_POST_ERROR,
  payload: { error },
});

const share = data => async dispatch => {
  dispatch(sharePostStarted());
  const url = `/api/v1/posts/${data.postSlug}/share/${data.platform}`;
  console.log(url);
  try {
    const res = await server.post(url);
    dispatch(sharePostSuccess(res));
    // console.log(res);
    return true;
  } catch (error) {
    dispatch(sharePostError(error.response.data.message));
    return false;
  }
};

export default share;
