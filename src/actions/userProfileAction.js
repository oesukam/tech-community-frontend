import server from '../Api/server';

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

export const changeImageError = error => ({
  type: CHANGE_IMAGE_ERROR,
  payload: { error },
});

const changeImage = image => async dispatch => {
  dispatch(changeImageStarted());
  const url = `${process.env.REACT_APP_BACKEND_URL}/api/api-docs/${image}/Profiles`;
  console.log(url);
  try {
    const res = await server.post(url);
    console.log('Success >>>>>>> ', res);
    dispatch(changeImageSuccess());
  } catch (error) {
    console.log('Error >>>>>>>>>>>>>', error);
    dispatch(changeImageError(error));
  }
};

export default changeImage;
