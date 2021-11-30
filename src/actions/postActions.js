import axios from 'axios';
import server from '../Api/server';
import * as types from '../actionTypes/postTypes';

const {
  REACT_APP_CLOUDINARY_URL_IMAGE,
  REACT_APP_CLOUDINARY_PRESET,
} = process.env;

/**
 * Triggers an action
 * when the process starts
 * @return {object} action
 */
const postStarted = () => ({ type: types.POST_STARTED });

/**
 * Triggers an action
 * when the process succeed
 * @param {object} post
 * @return {object} action
 */
const postSuccess = (post) => ({
  type: types.POST_SUCCESS,
  payload: post,
});

/**
 * Triggers an action
 * when the process fails
 * @param {object} error
 * @return {object} action
 */
const postError = (error) => ({
  type: types.POST_ERROR,
  payload: error,
});

/**
 * Triggers an action
 * when the post has been succeessful
 * to restore the tick
 * @return {object} action
 */
const restoreTick = () => ({ type: types.RESTORE_TICK });

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', REACT_APP_CLOUDINARY_PRESET);

  const res = await axios({
    url: REACT_APP_CLOUDINARY_URL_IMAGE,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-ww-form-urlencoded',
    },
    data: formData,
  });
  if (res) return res.data.secure_url;
  return null;
};

/**
 * post
 * @param {*} { username, email, password }
 * @return {object} response
 */
const post = (data) => async (dispatch) => {
  dispatch(postStarted());
  try {
    const payload = {
      description: data.value,
      type: data.category || undefined,
    };

    if (data.image) payload.image = await uploadImage(data.image);

    const res = await server.post('/posts', payload);

    dispatch(postSuccess(res.data.post));
    setTimeout(() => {
      dispatch(restoreTick());
    }, 3000);
    return true;
  } catch (e) {
    if (e.response) {
      if (e.response.data.errors) {
        dispatch(postError('The post should have at least 50 characters long'));
        return false;
      }
      dispatch(postError(e.response.data.message));
      return false;
    }
    dispatch(postError('Please check your internet connection'));
    return false;
  }
};

export default post;
