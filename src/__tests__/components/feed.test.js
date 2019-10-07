import React from 'react';
import { shallow } from 'enzyme';
import feedReducer from '../../reducers/feed';
import { SET_FEED, TOOGLE_LOADING } from '../../actionTypes/feed';
import {
  Feed,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Feed/Feed';
import feedMocks from '../../__mocks__/feedMocks';

describe('Feed', () => {
  let wrapper;
  const props = {
    onGetFeed: jest.fn(),
    feed: [feedMocks],
    loading: false,
    limit: 2,
  };

  describe('Feed.jsx', () => {
    test('should render Feed.jsx', () => {
      wrapper = shallow(<Feed {...props} />);
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
        feed: [feedMocks],
        loading: false,
        limit: 2,
      };
      const state = mapStateToProps({
        feed: { items: [feedMocks], loading: false, limit: 2 },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call onGetFeed', () => {
      mapped.onGetFeed(2, 0);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('Feed reducer', () => {
    test('should test the reducer with type SET_FEED', () => {
      const state = feedReducer(
        { items: [] },
        { type: SET_FEED, payload: [feedMocks] },
      );
      expect(state.items).toEqual([feedMocks]);
    });

    test('should test the reducer with type TOOGLE_LOADING', () => {
      const state = feedReducer({}, { type: TOOGLE_LOADING, payload: true });
      expect(state.loading).toBe(true);
    });
  });
});
