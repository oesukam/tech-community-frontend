import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Users, {
  Users as UsersComponent,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Users/Users';
import usersMocks from '../../__mocks__/usersMocks';

describe('Users component', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  let wrapper;
  const props = {
    onGetLatestUsers: jest.fn(),
    users: [usersMocks],
    history: { push: jest.fn() },
    loading: true,
  };

  beforeAll(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Users />
      </Provider>,
    );
  });

  describe('Users.jsx', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('`UsersComponent`', () => {
    it('should click on `view profile`', () => {
      wrapper = mount(<UsersComponent {...props} />);
      wrapper.find('button').simulate('click');
      expect(wrapper.props().history.push).toHaveBeenCalled();
    });
  });

  describe('State', () => {
    let mapped;
    let dispatch;

    beforeEach(() => {
      dispatch = jest.fn();
      mapped = mapDispatchToProps(dispatch);
    });

    test('should return `mapStateToProps`', () => {
      const expectedState = {
        users: [usersMocks],
        loading: true,
      };
      const state = mapStateToProps({
        users: { items: [usersMocks], loading: true },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call `onGetLatestUsers`', () => {
      mapped.onGetLatestUsers();
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
