import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from '../../Api/server';
import postCommentAction from '../../actions/postCommentAction';
import singlePostReducer from '../../reducers/singlePost';
import { FETCH_SUCCESS } from '../../actionTypes/singlePostTypes';
import {
  SinglePost,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/SinglePost/SinglePost';

const mockStore = configureMockStore([thunk]);

let wrapper;

const props = {
  post: {
    slug: 'slug',
    author: {},
    userType: 'userType',
    description: 'description',
    likesCount: 1,
    createdAt: 'createdAt',
    push: () => {},
  },
  relatedPosts: {
    isEmpty: false,
    feed: [],
  },
  onFetchSinglePost: jest.fn(),
  slug: 'slug',
  history: { push: () => {} },
};

describe('Post.jsx', () => {
  test('should render Post.jx', () => {
    wrapper = shallow(<SinglePost {...props} />);
    expect(wrapper).toMatchSnapshot();
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
        post: {
          slug: 'slug',
        },
      };
      const state = mapStateToProps({
        singlePost: { ...expectedState },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call onGetFeed', () => {
      mapped.onFetchSinglePost('slug');
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe('postCommentAction.js actions', () => {
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
    jest.spyOn(server, 'post').mockResolvedValue({
      data: {
        post: {
          description: 'description',
          image: 'image',
        },
      },
    });
    store.dispatch(postCommentAction('slug', 'body')).then((res) => {
      expect(res).toBe(true);
    });
  });

  it('should call the post action with error', () => {
    jest.spyOn(server, 'post').mockRejectedValue({
      response: {
        data: { message: 'message' },
      },
    });
    store.dispatch(postCommentAction('slug', 'body')).then((res) => {
      expect(res).toBe(true);
    });
  });

  it('should call the post action with error', () => {
    jest.spyOn(server, 'post').mockRejectedValue();
    store.dispatch(postCommentAction('slug', 'body')).then((res) => {
      expect(res).toBe(true);
    });
  });
});

describe('Post reducer', () => {
  it('should test the reducer with type FETCH_SUCCESS', () => {
    const state = singlePostReducer({}, { type: FETCH_SUCCESS, payload: { slug: 'slug' } });
    expect(state.post.slug).toBe('slug');
  });

  it('should test the reducer with type default', () => {
    const state = singlePostReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});
