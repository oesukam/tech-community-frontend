import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login as loginAction } from '../../actions/loginActions';
import loginReducer from '../../reducers/login';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_STARTED,
} from '../../actionTypes/loginTypes';
import {
  Login,
  mapStateToProps,
  mapDispatchToProps,
} from '../../pages/Login/Login';
import initialState from '../../store/initialState';

let wrapper;

const login = () => {
  return Promise.resolve(true);
};

const props = {
  login,
  onFormInputChanged: data => null,
  history: {
    push(val) {
      return jest.fn(val);
    },
  },
};

const user = {
  email: 'email@email.com',
  password: 'password',
};

describe('Signup.jsx', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Login {...props} />
      </Router>,
    );

    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('should render Login.jx', () => {
    wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should signup the user', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
      {
        status: 201,
      },
    );

    wrapper.find('.register').simulate('click');

    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: 'username@email.com' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: 'wrongformat' } });

    wrapper.find('.button').simulate('click');

    shallow(<Login {...props} />)
      .instance()
      .onSubmit();
    expect(wrapper.props().children.props.history.push).toEqual(
      expect.any(Function),
    );
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const expectedState = {
        loading: false,
        error: null,
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(expectedState);
    });
    test('should return `mapDispatchToProps`', () => {
      const dispatch = action => action;
      const mappedObject = mapDispatchToProps(dispatch);
      expect(mappedObject).toHaveProperty('login');
      expect(mappedObject.login('user')).toEqual(expect.any(Function));
    });
  });
});

const mockStore = configureMockStore([thunk]);

describe('Login actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      events: {},
    });

    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should call the login action with success', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
      {
        status: 201,
        response: {
          data: {
            user,
            token: 'token',
          },
        },
      },
    );
    store.dispatch(loginAction(user)).then(res => {
      expect(res).toBe(true);
    });
  });

  it('should call the login action with error', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`,
      {
        status: 400,
        response: {
          data: {
            error: 'The password should have uppercase letters and numbers',
          },
        },
      },
    );
    store.dispatch(loginAction(user)).then(res => {
      expect(res.data.error).toBe(
        'The password should have uppercase letters and numbers',
      );
    });
  });
});

describe('Login reducer', () => {
  it('should test the reducer with type LOGIN_ERROR', () => {
    const state = loginReducer({}, { type: LOGIN_ERROR, payload: {} });
    expect(state.loading).toBe(false);
  });

  it('should test the reducer with type LOGIN_SUCCESS', () => {
    const state = loginReducer({}, { type: LOGIN_SUCCESS, payload: {} });
    expect(state.loggedIn).toBe(true);
  });

  it('should test the reducer with type LOGIN_STARTED', () => {
    const state = loginReducer({}, { type: LOGIN_STARTED, payload: {} });
    expect(state.loading).toBe(true);
  });

  it('should test the reducer with type default', () => {
    const state = loginReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
