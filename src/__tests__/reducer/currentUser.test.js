import reducer from '../../reducers/currentUser';
import * as types from '../../actionTypes/currentUserTypes';
import { currentUser as initialState } from '../../store/initialState';

describe('CurrentUser reducer', () => {
  it('SET_IS_AUTH', async () => {
    const action = {
      type: types.SET_IS_AUTH,
      payload: {
        isAuth: true,
      },
    };
    const res = reducer({}, action);
    expect(res.isAuth).toBeTruthy();
  })

  it('SET_CURRENT_USER', async () => {
    const action = {
      type: types.SET_CURRENT_USER,
      payload: { id: 5 },
    };
    const res = reducer({}, action);
    expect(res.user).toBe(action.payload);
  })

  it('DEFAULT', async () => {
    const action = {
      type: types.SET_CURRENT_USER + 'default',
      payload: {},
    };
    const res = reducer({ initialState }, action);
    expect(res.initialState.isAuth).toBeFalsy();
  })
})