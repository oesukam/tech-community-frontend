import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Header, mapStateToProps } from '../../components/Header/Header';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  match: { path: '' },
  location: {
    search: {}
  },
  user: {
    user: {
      picture: 'http://picture.jpg'
    }
  },
  handleShowAndHide: jest.fn()
};

const mockStore = configureMockStore([thunk]);

describe('Header.jsx', () => {
  let store;
  beforeEach(() => {
    const socialAuth = { show: false }
    store = mockStore({
      ...initialState, socialAuth
    });
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header {...props} />
        </Router>
      </Provider>
    );
  });
  test('should render Header.jx', () => {
    wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Header.jx', () => {
    const component = wrapper.find('Header');
    expect(component.props().match).toHaveProperty('path');
  });

  test('should render Header.jx with login user', () => {
    const newProps = { ...props, isAuth: true };
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header {...newProps} />
        </Router>
      </Provider>
    );
    const component = wrapper.find('Header');
    expect(component.props().isAuth).toBeTruthy();
  });

  describe('when clicking on `menu` button', () => {
    test('should toggle `menu` state', () => {
      wrapper.find('button.navbar-toggler').simulate('click');
      const component = wrapper.find('Header');
      expect(component.state().menu).toBeTruthy();
    });
  });

  describe('when click on `login/signup` button', () => {
    test('should show the Modal', () => {
      wrapper.find('button.nav-link.login-btn').simulate('click');
      expect(props.handleShowAndHide).toHaveBeenCalledWith(true);
    })

    test('should show the Modal', () => {
      wrapper.find('button.nav-link.signup-btn').simulate('click');
      expect(props.handleShowAndHide).toHaveBeenCalledWith(true);
    })

  })

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const expectedState = {
        isAuth: false,
        user: {},
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(expectedState);
    });
  });
});
