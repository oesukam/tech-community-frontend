import reducer from '../../reducers/sharePost';
import {
  SHARE_POST_STARTED,
  SHARE_POST_SUCCESS,
  SHARE_POST_ERROR,
} from '../../actionTypes/sharePostTypes';

describe.only('SharePost reducer', () => {
  it('SHARE_POST_STARTED', () => {
    const action = {
      type: SHARE_POST_STARTED,
    };
    const res = reducer({}, action);
    expect(res.loading).toBeTruthy();
  });

  it('SHARE_POST_SUCCESS', () => {
    const action = {
      type: SHARE_POST_SUCCESS,
      payload: { message: 'Success' },
    };
    const response = reducer(res, action);

    expect(response.message).toBe('Success');
  });

  it('SHARE_POST_ERROR', () => {
    const action = {
      type: SHARE_POST_ERROR,
    };
    const res = reducer({ error: 'Not Found' }, action);
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
