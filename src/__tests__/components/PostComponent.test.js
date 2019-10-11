import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from '../../Api/server';
import post from '../../actions/fetchSinglePostAction';
import postReducer from '../../reducers/posts';
import {
  POST_ERROR,
  POST_SUCCESS,
  POST_STARTED,
} from '../../actionTypes/postTypes';
import Post from '../../components/PostComponent/Post';

const mockStore = configureMockStore([thunk]);

let wrapper;

const props = {
  author: { username: 'username', picture: 'profilePicture' },
  userType: 'perso',
  description: 'desc',
  likesCount: 0,
  createdAt: '0/0/0',
  slug: 'slug',
  push: jest.fn(),
};

describe('Post.jsx', () => {
  test('should render Post.jx', () => {
    wrapper = shallow(<Post {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

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

    jest.spyOn(server, 'get').mockResolvedValue({
      response: {
        data: { post: { message: 'message' } }
      }
    });
    store.dispatch(post('slug')).then(res => {
      expect(res).toBe(true);
    });
  });

  it('should call the post action with error', () => {
    jest.spyOn(server, 'get').mockRejectedValue({
      response: {
        data: { post: { message: 'message' } }
      }
    });
    store.dispatch(post('slug')).then(res => {
      expect(res).toBe(true);
    });
  });
});
