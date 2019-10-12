import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import post from '../../actions/postActions';
import postReducer from '../../reducers/posts';
import {
  POST_ERROR,
  POST_SUCCESS,
  POST_STARTED,
} from '../../actionTypes/postTypes';
import { Post, mapDispatchToProps, mapStateToProps } from '../../components/Post/Post';

let wrapper;

const props = {
  minRows: 3,
  maxRows: 15,
  loading: false,
  error: false,
  tick: false,
  post: jest.fn(),
};

describe('Post.jsx', () => {
  test('should render Post.jx', () => {
    wrapper = shallow(<Post {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const expectedState = {
        loading: false,
        error: false,
        tick: false,
      };
      const state = mapStateToProps({ posts: { ...expectedState } });
      expect(state).toEqual(expectedState);
    });
    test('should return `mapDispatchToProps`', () => {
      const dispatch = (action) => action;
      const mappedObject = mapDispatchToProps(dispatch);
      expect(mappedObject).toHaveProperty('post');
      expect(mappedObject.post('post')).toEqual(expect.any(Function));
    });
  });
});

const mockStore = configureMockStore([thunk]);

describe('Post actions', () => {
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

  it('should call the post action with success', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
      {
        status: 201,
        response: {
          data: {
            post: {
              description: 'description',
              image: 'image',
            },
          },
        },
      },
    );
    moxios.stubRequest(
      `${process.env.REACT_APP_CLOUDINARY_URL_IMAGE}`,
      {
        status: 201,
        response: {
          data: {
            secure_url: 'image.url',
          },
        },
      },
    );
    store.dispatch(post({ value: 'value', image: 'image' })).then((res) => {
      expect(res).toBe(true);
    });
  });

  it('should call the post action with error', () => {
    moxios.stubRequest(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
      {
        status: 201,
        response: {
          data: {
            post: {
              description: 'description',
              image: 'image',
            },
          },
        },
      },
    );
    moxios.stubRequest(
      `${process.env.REACT_APP_CLOUDINARY_URL_IMAGE}`,
      {
        status: 400,
        response: {
          data: {
            secure_url: 'image.url',
          },
        },
      },
    );
    store.dispatch(post({ value: 'value', image: 'image' })).then((res) => {
      expect(res).toBe(true);
    });
  });
});

describe('Post reducer', () => {
  it('should test the reducer with type LOGIN_ERROR', () => {
    const state = postReducer({}, { type: POST_ERROR, payload: {} });
    expect(state.loading).toBe(false);
  });

  it('should test the reducer with type LOGIN_SUCCESS', () => {
    const state = postReducer({}, { type: POST_SUCCESS, payload: {} });
    expect(state.error).toBe(false);
  });

  it('should test the reducer with type LOGIN_STARTED', () => {
    const state = postReducer({}, { type: POST_STARTED, payload: {} });
    expect(state.loading).toBe(true);
  });

  it('should test the reducer with type default', () => {
    const state = postReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
