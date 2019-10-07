import server from '../../Api/server';
import { getFeed } from '../../actions/feedActions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import feedMocks from '../../__mocks__/feedMocks';

const mockStore = configureMockStore([thunk]);

describe('Login actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('Should return when the limit is greater than the items length', () => {
    store.dispatch(getFeed(40, 0)).then(() => {
      expect(store.getActions()).not.toMatchSnapshot();
    });
  });

  test('Should call the `getFeed` action with success', () => {
    jest.spyOn(server, 'get').mockResolvedValue({
      data: { feed: [feedMocks] },
    });

    store.dispatch(getFeed(0, 0)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  test('Should call the `getFeed` action with success', () => {
    jest.spyOn(server, 'get').mockRejectedValue({
      data: { feed: [feedMocks] },
    });

    store.dispatch(getFeed(0, 0)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
