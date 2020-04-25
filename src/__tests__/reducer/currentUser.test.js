import reducer from '../../reducers/currentUser';
import * as types from '../../actionTypes/currentUserTypes';
import { FOLLOW_USER_ERROR, UPDATE_PROFILE_ERROR } from '../../actionTypes/profileTypes';
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
  });

  it('SET_CURRENT_USER', async () => {
    const action = {
      type: types.SET_CURRENT_USER,
      payload: {
        user: { id: 5 },
      },
    };
    const res = reducer({}, action);
    expect(res).toStrictEqual(action.payload);
  });

  it('RESET_CURRENT_FETCHED_MEMBER', async () => {
    const action = {
      type: types.RESET_CURRENT_FETCHED_MEMBER,
    };
    const res = reducer({}, action);
    expect(res).toStrictEqual({ membersProfile: { username: null } });
  });

  it('UPDATE_PROFILE_ERROR', async () => {
    const action = {
      type: UPDATE_PROFILE_ERROR,
    };
    const res = reducer({ message: 'message' }, action);

    expect(res).toStrictEqual({
      error: undefined,
      message: 'message',
    });
  });

  it('FOLLOW_USER_ERROR', async () => {
    const action = {
      type: FOLLOW_USER_ERROR,
    };
    const res = reducer({ message: 'message' }, action);
    expect(res).toStrictEqual({
      error: undefined,
      message: 'message',
    });
  });

  it('DEFAULT', async () => {
    const action = {
      type: `${types.SET_CURRENT_USER}default`,
      payload: {},
    };
    const res = reducer({ initialState }, action);
    expect(res.initialState.isAuth).toBeFalsy();
  });
});
