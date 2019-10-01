import reducer from '../../reducers/socialAuth';
import { SHOW_SOCIAL_AUTH, HIDE_SOCIAL_AUTH } from '../../actionTypes/socialAuth';

describe('Social Auth reducer', () => {
  it('SHOW_SOCIAL_AUTH', async () => {
    const action = {
      type: SHOW_SOCIAL_AUTH,
      payload: {},
    };
    const res = reducer({}, action);
    expect(res.show).toBeTruthy();
  })

  it('HIDE_SOCIAL_AUTH', async () => {
    const action = {
      type: HIDE_SOCIAL_AUTH,
      payload: {},
    };
    const res = reducer({}, action);
    expect(res.show).toBeFalsy();
  })

  it('DEFAULT', async () => {
    const action = {
      type: HIDE_SOCIAL_AUTH + 'default',
      payload: {},
    };
    const res = reducer({}, action);
    expect(res.show).toBeFalsy();
  })
})