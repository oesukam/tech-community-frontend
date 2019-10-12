import reducer from '../../reducers/sharePost';
import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../../actionTypes/sharePostTypes';

describe('SharePost reducer', () => {
  it('SHARE_POST_STARTED', () => {
    const action = {
      type: SHARE_POST_STARTED,
      payload: {},
    };
    const res = reducer({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('SHARE_POST_SUCCESS', () => {
    const action = {
      type: SHARE_POST_SUCCESS,
      payload: { message: 'Success' },
    };
    const response = reducer({}, action);

    expect(response.message).toBe('Success');
  });

  it('SHARE_POST_ERROR', () => {
    const action = {
      type: SHARE_POST_ERROR,
      payload: { error: 'Not Found' },
    };
    const res = reducer({}, action);
    expect(res.error).toBe('Not Found');
  });

  it('DEFAULT', () => {
    const action = {
      type: '',
      payload: {},
    };
    const res = reducer({}, action);

    expect(res.response).toBeFalsy();
  });
});
