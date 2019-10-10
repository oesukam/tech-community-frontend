import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes/currentUserTypes';
import initialState from '../../store/initialState';
import { setIsLoggedOut } from '../../actions/logout';

const mockStore = configureMockStore([thunk]);
localStorage.setItem('token', 'token');

describe('Logout', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('Logs out the user', async () => {
    await store.dispatch(setIsLoggedOut());
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(types.LOGOUT_SUCCESS);
    expect(actions[0].payload).toEqual(true);
  });
});
