import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { signup as signupAction } from '../../actions/signupActions';
import signupReducer from '../../reducers/signup';
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_STARTED,
} from '../../actionTypes/signupTypes';
import {
  Signup,
  mapStateToProps,
  mapDispatchToProps,
} from '../../pages/Signup/Signup';
import initialState from '../../store/initialState';

let wrapper;

const signup = () => {
  return Promise.resolve(true);
};

const props = {
  signup,
  onFormInputChanged: data => null,
  history: {
    push(val) {
      return jest.fn(val);
    },
  },
};

const user = {
  organizationName: 'name',
  username: 'username',
  email: 'email@email.com',
  password: 'password',
};

describe('Signup.jsx', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Signup {...props} />
      </Router>,
    );

    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test('should render Signup.jx', () => {
    wrapper = shallow(<Signup />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should signup the user', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
      {
        status: 201,
      },
    );

    wrapper.find('.register').simulate('click');

    wrapper
      .find('input[name="companyName"]')
      .simulate('change', { target: { value: 'name' } });
    wrapper
      .find('input[name="username"]')
      .simulate('change', { target: { value: 'username' } });
    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: 'username@email.com' } });
    wrapper
      .find('input[name="password"]')
      .simulate('change', { target: { value: 'wrongformat' } });

    wrapper.find('button').simulate('click');

    shallow(<Signup {...props} />)
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
      expect(mappedObject).toHaveProperty('signup');
      expect(mappedObject.signup('user')).toEqual(expect.any(Function));
    });
  });
});

const mockStore = configureMockStore([thunk]);

describe('Signup actions', () => {
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

  it('should call the signup action with success', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
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
    store.dispatch(signupAction(user)).then(res => {
      expect(res).toBe(true);
    });
  });

  it('should call the signup action with error', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`,
      {
        status: 400,
        response: {
          data: {
            error: 'The password should have uppercase letters and numbers',
          },
        },
      },
    );
    store.dispatch(signupAction(user)).then(res => {
      expect(res.data.error).toBe(
        'The password should have uppercase letters and numbers',
      );
    });
  });
});

describe('Signup reducer', () => {
  it('should test the reducer with type SIGNUP_ERROR', () => {
    const state = signupReducer({}, { type: SIGNUP_ERROR, payload: {} });
    expect(state.loading).toBe(false);
  });

  it('should test the reducer with type SIGNUP_SUCCESS', () => {
    const state = signupReducer({}, { type: SIGNUP_SUCCESS, payload: {} });
    expect(state.loggedIn).toBe(true);
  });

  it('should test the reducer with type SIGNUP_STARTED', () => {
    const state = signupReducer({}, { type: SIGNUP_STARTED, payload: {} });
    expect(state.loading).toBe(true);
  });

  it('should test the reducer with type default', () => {
    const state = signupReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
