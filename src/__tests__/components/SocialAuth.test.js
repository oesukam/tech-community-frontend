import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SocialAuth from '../../components/Login/socialAuth';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  handleShowAndHide: jest.fn(),
  show: true,
};

const mockStore = configureMockStore([thunk]);

describe('Header.jsx', () => {
  let store;
  beforeEach(() => {
    const socialAuth = { show: false };
    store = mockStore({
      ...initialState, socialAuth,
    });
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <SocialAuth {...props} />
        </Router>
      </Provider>,
    );
  });
  test('should render SocialAuth.jx', () => {
    // wrapper = shallow(<SocialAuth {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when click on `login with google/github` button', () => {
    beforeEach(() => {
      delete window.location;
      window.location = { replace: jest.fn() };
    });
    test('should hit the login with google endpoint', () => {
      wrapper.find('button.social-login-google').simulate('click');
      expect(window.location.replace).toHaveBeenCalled();
    });

    test('should hit the login with github endpoint', () => {
      wrapper.find('button.social-login-github').simulate('click');
      expect(window.location.replace).toHaveBeenCalled();
    });
  });
});
