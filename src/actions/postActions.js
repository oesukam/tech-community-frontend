import axios from 'axios';
import server from '../Api/server';
import {
  POST_ERROR,
  POST_STARTED,
  POST_SUCCESS,
  RESTORE_TICK,
} from '../actionTypes/postTypes';

const {
  REACT_APP_CLOUDINARY_URL_IMAGE,
  REACT_APP_CLOUDINARY_PRESET,
} = process.env;

/**
 * Triggers an action
 * when the process starts
 * @return {object} action
 */
const postStarted = () => ({ type: POST_STARTED });

/**
 * Triggers an action
 * when the process succeed
 * @param {object} post
 * @return {object} action
 */
const postSuccess = post => ({
  type: POST_SUCCESS,
  payload: post,
});

/**
 * Triggers an action
 * when the process fails
 * @param {object} error
 * @return {object} action
 */
const postError = error => ({
  type: POST_ERROR,
  payload: error,
});

/**
 * Triggers an action
 * when the post has been succeessful
 * to restore the tick
 * @return {object} action
 */
const restoreTick = () => ({ type: RESTORE_TICK });

const uploadImage = async file => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', REACT_APP_CLOUDINARY_PRESET);

  try {
    const res = await axios({
      url: REACT_APP_CLOUDINARY_URL_IMAGE,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-ww-form-urlencoded',
      },
      data: formData,
    });
    return res.data.secure_url;
  } catch (error) {
    throw error;
  }
};

/**
 * post
 * @param {*} { username, email, password }
 * @return {object} response
 */
const post = ({ value: description, image }) => async dispatch => {
  dispatch(postStarted());

  try {
    const payload = {
      description,
      title: String(description).substr(0, 15),
    };

    if (image) payload.image = await uploadImage(image);

    const res = await server.post(`/api/v1/posts`, payload);

    const { post } = res.data;
    dispatch(postSuccess(post));
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
