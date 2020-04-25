import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes/currentUserTypes';
import initialState from '../../store/initialState';
import {
  resetFetchedMemberProfile,
  getUserFollowersDetails,
} from '../../actions/profile';

const mockStore = configureMockStore([thunk]);
localStorage.setItem('token', 'token');

describe('Logout', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('resetFetchedMemberProfile', async () => {
    await store.dispatch(resetFetchedMemberProfile());
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(types.RESET_CURRENT_FETCHED_MEMBER);
  });

  it('getUserFollowersDetails', async () => {
    await store.dispatch(getUserFollowersDetails());
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(types.GET_USER_DETAILS_ERROR);
  });
});
