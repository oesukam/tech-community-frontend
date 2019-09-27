import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes/currentUserTypes';
import initialState from '../../store/initialState';
import socialAuthAction from '../../actions/socialAuth';

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
})