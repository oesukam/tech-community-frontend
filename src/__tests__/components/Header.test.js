import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
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
  }
};
describe('Header.jsx', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Header {...props} />
      </Router>,
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
      <Router>
        <Header {...newProps} />
      </Router>,
    );
    const component = wrapper.find('Header');
    expect(component.props().isAuth).toBeTruthy();
  });

  describe('when clicking on `menu` button', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>,
      );
    });
    test('should toggle `menu` state', () => {
      wrapper.find('button.navbar-toggler').simulate('click');
      const component = wrapper.find('Header');
      expect(component.state().menu).toBeTruthy();
    });
  });

  describe('when click on `login` button', () => {
    test('should show the Modal', () => {
      wrapper.find('button.nav-link.login-btn').simulate('click');
      const component = wrapper.find('Header');
      expect(component.state().showModal).toBeTruthy();
    })

    test('should hide the Modal', () => {
      const component = wrapper.find('Header');
      const instance = component.instance();
      instance.hideModal();
    })
  })

  describe('when click on `login with google/github` button', () => {

    beforeEach(() => {
      delete window.location;
      window.location = { replace: jest.fn() };
    });
    test('should hit the login with google endpoint', () => {
      wrapper.find('button.social-login-google').simulate('click');
      expect(window.location.replace).toHaveBeenCalled();
    })

    test('should hit the login with github endpoint', () => {
      wrapper.find('button.social-login-github').simulate('click');
      expect(window.location.replace).toHaveBeenCalled();
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
