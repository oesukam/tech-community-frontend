import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes/currentUserTypes';
import { SHOW_SOCIAL_AUTH, HIDE_SOCIAL_AUTH } from '../../actionTypes/socialAuth';
import initialState from '../../store/initialState';
import socialAuthAction, { handleShowAndHide } from '../../actions/socialAuth';

const mockStore = configureMockStore([thunk]);

describe('Social auth action', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('should despatch `SET_IS_AUTH` and `SET_CURRENT_USER` ', async () => {
    await store.dispatch(socialAuthAction('token', {}));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(types.SET_IS_AUTH);
    expect(actions[1].type).toEqual(types.SET_CURRENT_USER);
  })

  it('should despatch `SHOW_SOCIAL_AUTH` when taking true', async () => {
    await store.dispatch(handleShowAndHide(true));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(SHOW_SOCIAL_AUTH);
  })

  it('should despatch `HIDE_SOCIAL_AUTH` when taking true', async () => {
    await store.dispatch(handleShowAndHide(false));
    const actions = await store.getActions();
    expect(actions[0].type).toEqual(HIDE_SOCIAL_AUTH);
  })
})