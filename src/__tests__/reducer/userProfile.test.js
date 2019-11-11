import reducer from '../../reducers/userProfile';
import {
  CHANGE_IMAGE_STARTED,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
} from '../../actionTypes/userProfileTypes';

describe.only('UserProfile reducer', () => {
  it('CHANGE_IMAGE_STARTED', () => {
    const action = {
      type: CHANGE_IMAGE_STARTED,
    };
    const res = reducer({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('CHANGE_IMAGE_SUCCESS', () => {
    const action = {
      type: CHANGE_IMAGE_SUCCESS,
    };
    const response = reducer({}, action);

    expect(response.loading).toBeFalsy();
  });

  it('CHANGE_IMAGE_ERROR', () => {
    const action = {
      type: CHANGE_IMAGE_ERROR,
      payload: { error: 'Network Error' },
    };
    const res = reducer({}, action);
    expect(res.error).toBe('Network Error');
  });

  it('DEFAULT', () => {
    const action = {
      type: '',
      payload: {},
    };
    const res = reducer({}, action);

    expect(res).toEqual({});
  });
});
