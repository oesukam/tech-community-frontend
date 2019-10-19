import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import * as types from '../../actionTypes/currentUserTypes';
import {
  SHOW_SOCIAL_AUTH,
  HIDE_SOCIAL_AUTH,
} from '../../actionTypes/socialAuth';
import initialState from '../../store/initialState';
import socialAuthAction, {
  handleShowAndHide,
  getUserDetails,
} from '../../actions/socialAuth';

const mockStore = configureMockStore([thunk]);
localStorage.setItem('token', 'token');

describe('Social auth action', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should despatch `SET_IS_AUTH` and `SET_CURRENT_USER` ', async () => {
    await store.dispatch(socialAuthAction('token', {}));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(types.SET_IS_AUTH);
    expect(actions[1].type).toEqual(types.SET_CURRENT_USER);
  });

  it('should despatch `SHOW_SOCIAL_AUTH` when taking true', async () => {
    await store.dispatch(handleShowAndHide(true));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(SHOW_SOCIAL_AUTH);
  });

  it('should despatch `HIDE_SOCIAL_AUTH` when taking true', async () => {
    await store.dispatch(handleShowAndHide(false));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(HIDE_SOCIAL_AUTH);
  });

  it('should get details of the logged in user', async () => {
    const username = 'username';
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/profiles/${username}`,
      {
        status: 200,
        response: {
          data: {
            picture:
              'https://lh3.googleusercontent.com/a-/AAuE7mAPE8m85MpKcbkrixrDfUjyXdifxFB53q1Mc5Xz',
            followerCount: 0,
            followedCount: 0,
            userType: 'person',
            verified: false,
            recommendations: [],
            _id: '5d94ceab6c9cd50023b994df',
            username: 'PrémicesTuvere10953',
            email: 'premices.tuvere@gmail.com',
            __v: 0,
          },
        },
      },
    );
    store.dispatch(getUserDetails('username')).then((res) => {
      expect(res).toBe(true);
    });
  });
});
