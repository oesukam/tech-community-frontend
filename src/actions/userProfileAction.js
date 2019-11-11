import axios from 'axios';

import {
  CHANGE_IMAGE_STARTED,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
} from '../actionTypes/userProfileTypes';

export const changeImageStarted = () => ({
  type: CHANGE_IMAGE_STARTED,
});

export const changeImageSuccess = () => ({
  type: CHANGE_IMAGE_SUCCESS,
});

export const changeImageError = (error) => ({
  type: CHANGE_IMAGE_ERROR,
  payload: { error },
});

const randomNumbers = () => {
  let count = '';
  for (let i = 0; i < 4; i += 1) {
    count += Math.trunc(Math.random() * 10);
  }
  return count;
};

const changeImage = (image, username) => async (dispatch) => {
  dispatch(changeImageStarted());
  try {
    const formData = new FormData();
    const newImageName = username + randomNumbers();
    formData.append('file', image, newImageName);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    const res = await axios({
      url: process.env.REACT_APP_CLOUDINARY_URL_IMAGE,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-ww-form-urlencoded',
      },
      data: formData,
    });
    if (res) return dispatch(changeImageSuccess());
    return new Error('Something Went Wrong');
  } catch (error) {
    dispatch(changeImageError(error.message));
  }
};

export default changeImage;
