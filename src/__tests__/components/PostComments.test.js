import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import postCommentsReducer from '../../reducers/postComments';
import { TOGGLE_LOADING, SET_COMMENTS } from '../../actionTypes/postComments';
import {
  PostComments,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/PostComments/PostComments';
import postCommentMock from '../../__mocks__/postCommentMock';

describe('PostComments', () => {
  let wrapper;
  const props = {
    post: { likesCount: 2, slug: 'slug' },
    items: [postCommentMock],
    loading: false,
    onGetPostComments: jest.fn(),
  };

  describe('PostComments.jsx', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <PostComments {...props} />
        </Router>,
      );
    });

    test('should render PostComments.jsx', () => {
      wrapper = shallow(<PostComments {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('State', () => {
    let mapped, dispatch;
    beforeEach(() => {
      dispatch = jest.fn();
      mapped = mapDispatchToProps(dispatch);
    });

    test('should return `mapStateToProps`', () => {
      const expectedState = {
        items: [postCommentMock],
        loading: false,
      };
      const state = mapStateToProps({
        postComments: { items: [postCommentMock], loading: false },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call `onGetPostComments`', () => {
      mapped.onGetPostComments('slug');
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('PostComments reducer', () => {
    test('should test the reducer with type SET_COMMENTS', () => {
      const state = postCommentsReducer(
        { items: [] },
        { type: SET_COMMENTS, payload: [postCommentMock] },
      );
      expect(state.items).toEqual([postCommentMock]);
    });

    test('should test the reducer with type TOGGLE_LOADING', () => {
      const state = postCommentsReducer(
        {},
        { type: TOGGLE_LOADING, payload: true },
      );
      expect(state.loading).toBe(true);
    });
  });
});
