import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from '../../Api/server';
import { getPostComments } from '../../actions/postComments';
import postCommentMock from '../../__mocks__/postCommentMock';

const mockStore = configureMockStore([thunk]);

describe('Login actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('Should call the `getPostComments` action with success', () => {
    jest.spyOn(server, 'get').mockResolvedValue({
      data: { postComments: [postCommentMock] },
    });

    store.dispatch(getPostComments('slug')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  test('Should call the `getPostComments` action with success', () => {
    jest.spyOn(server, 'get').mockRejectedValue({
      error: {},
    });

    store.dispatch(getPostComments('slug')).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
