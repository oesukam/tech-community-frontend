import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../actionTypes/userProfileTypes';
import changeImage, {
  changeImageStarted,
  changeImageSuccess,
  changeImageError,
} from '../../actions/userProfileAction';

const mockStore = configureMockStore([thunk]);

describe('Share Post Action', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('should dispatch `CHANGE_IMAGE_STARTED`', async () => {
    await store.dispatch(changeImageStarted());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.CHANGE_IMAGE_STARTED);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `CHANGE_IMAGE_SUCCESS`', async () => {
    await store.dispatch(changeImageSuccess());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.CHANGE_IMAGE_SUCCESS);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `CHANGE_IMAGE_ERROR`', async () => {
    await store.dispatch(changeImageError());
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.CHANGE_IMAGE_ERROR);
    expect(action.length).toEqual(1);
  });

  it('should dispatch `CHANGE_IMAGE_STARTED` and`CHANGE_IMAGE_ERROR`', async () => {
    moxios.stubRequest(`${process.env.REACT_APP_CLOUDINARY_URL_IMAGE}`, {
      status: 400,
    });
    await store.dispatch(changeImage(null, null));
    const action = await store.getActions();
    expect(action[0].type).toEqual(types.CHANGE_IMAGE_STARTED);
    expect(action[1].type).toEqual(types.CHANGE_IMAGE_ERROR);
    expect(action.length).toEqual(2);
  });
});
