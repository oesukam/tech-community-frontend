import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actionTypes/sharePostTypes';
import {
  sharePostStarted,
  sharePostSuccess,
  sharePostError,
  sharePost,
} from '../../actions/sharePostAction';
import server from '../../Api/server';

const mockStore = configureMockStore([thunk]);

describe('Share Post Action', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch `SHARE_POST_STARTED`', async () => {
    await store.dispatch(sharePostStarted());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.SHARE_POST_STARTED);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `SHARE_POST_SUCCESS`', async () => {
    await store.dispatch(sharePostSuccess());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.SHARE_POST_SUCCESS);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `SHARE_POST_ERROR`', async () => {
    await store.dispatch(sharePostError());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.SHARE_POST_ERROR);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `SHARE_POST_STARTED` and`SHARE_POST_SUCCESS`', async () => {
    const data = {
      postSlug: 'this-is-a-wrong-title-d54a7093',
      platform: 'test-platform',
    };
    jest.spyOn(server, 'post').mockResolvedValue();
    await store.dispatch(sharePost(data));
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.SHARE_POST_STARTED);
    expect(action[1].type).toEqual(types.SHARE_POST_SUCCESS);
    expect(action.length).toEqual(3);
  });

  it('should dispatch `SHARE_POST_STARTED` and`SHARE_POST_ERROR`', async () => {
    const data = {
      platform: 'test-platform',
    };
    jest.spyOn(server, 'post').mockRejectedValue();
    await store.dispatch(sharePost(data));
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.SHARE_POST_STARTED);
    expect(action[1].type).toEqual(types.SHARE_POST_ERROR);
    expect(action.length).toEqual(2);
  });
});
