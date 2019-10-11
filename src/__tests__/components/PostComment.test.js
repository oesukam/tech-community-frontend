import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import post from '../../actions/postActions';
import postCommentReducer from '../../reducers/postComment';
import {
  POST_COMMENT_ERROR,
  POST_COMMENT_STARTED,
  POST_COMMENT_SUCCESS,
  RESTORE_COMMENT_TICK,
} from '../../actionTypes/postCommentTypes';
import {
  PostComment as Post, mapStateToProps,
  mapDispatchToProps,
} from '../../components/PostComment/PostComment';

const mockStore = configureMockStore([thunk]);

let wrapper;

const props = {
  slug: 'slug',
};

describe('Post.jsx', () => {
  test('should render Post.jx', () => {
    wrapper = shallow(<Post {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('State', () => {
    let mapped, dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mapped = mapDispatchToProps(dispatch);
    });

    test('should return `mapStateToProps`', () => {
      const expectedState = {
        loading: false,
        error: false,
        tick: true,
      };
      const state = mapStateToProps({
        postComment: { ...expectedState },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call onGetFeed', () => {
      mapped.post('slug', 'body');
      expect(dispatch).toHaveBeenCalled();
    });
  });
});

describe('Post reducer', () => {
  it('should test the reducer with type POST_COMMENT_STARTED', () => {
    const state = postCommentReducer({}, { type: POST_COMMENT_STARTED, payload: { slug: 'slug' } });
    expect(state.loading).toBe(true);
  });

  it('should test the reducer with type POST_COMMENT_SUCCESS', () => {
    const state = postCommentReducer({}, { type: POST_COMMENT_SUCCESS, payload: { slug: 'slug' } });
    expect(state.tick).toBe(true);
  });

  it('should test the reducer with type POST_COMMENT_ERROR', () => {
    const state = postCommentReducer({}, { type: POST_COMMENT_ERROR, payload: 'error occured' });
    expect(state.error).toBe('error occured');
  });

  it('should test the reducer with type RESTORE_COMMENT_TICK', () => {
    const state = postCommentReducer({}, { type: RESTORE_COMMENT_TICK, payload: 'error occured' });
    expect(state.tick).toBe(false);
  });

  it('should test the reducer with type default', () => {
    const state = postCommentReducer({}, { type: 'default', payload: {} });
    expect(state).toEqual(expect.any(Object));
  });
});