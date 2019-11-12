import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from '../../Api/server';
import { getLatestUsers } from '../../actions/usersActions';
import usersMocks from '../../__mocks__/usersMocks';

const mockStore = configureMockStore([thunk]);

describe('Users actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  test('Should call the `getLatestUsers` action with success', () => {
    jest.spyOn(server, 'get').mockResolvedValue({
      data: { profiles: [usersMocks] },
    });

    store.dispatch(getLatestUsers()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  test('Should call the `getLatestUsers` action with error', () => {
    jest.spyOn(server, 'get').mockRejectedValue({
      e: new Error(),
    });

    store.dispatch(getLatestUsers()).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
