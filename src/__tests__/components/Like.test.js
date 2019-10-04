import React from 'react';
import { shallow, mount } from 'enzyme';
import Like, {
  Like as LikeComponent,
  mapStateToProps,
  mapDispatchToProps,
} from '../../components/Like/Like';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { like, unlike } from '../../actions/likeActions';

describe('Like', () => {
  let store;
  let axiosInstance;
  const mockStore = configureMockStore([thunk]);
  store = mockStore({});

  let wrapper;
  const props = {
    isAuth: false,
    onLike: jest.fn(),
    onUnlike: jest.fn(),
    onToggleSocialModal: jest.fn(),
    slug: 'article-1234',
    likesCount: 2,
  };

  beforeAll(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Like />
      </Provider>,
    );
  });

  describe('Like.jsx', () => {
    it('should render the component', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('`LikeComponent`', () => {
    it('should call `onToggleSocialModal`', () => {
      wrapper = mount(<LikeComponent {...props} />);
      wrapper.find('.action').simulate('click');
      expect(wrapper.props().onToggleSocialModal).toHaveBeenCalled();
    });

    it('should call `onLike`', () => {
      wrapper = mount(<LikeComponent {...{ ...props, isAuth: true }} />);
      wrapper.find('.action').simulate('click');
      expect(wrapper.props().onLike).toHaveBeenCalled();
    });

    it('should call `onUnlike`', () => {
      wrapper = mount(
        <LikeComponent {...{ ...props, liked: true, isAuth: true }} />,
      );
      wrapper.find('.action').simulate('click');
      expect(wrapper.props().onUnlike).toHaveBeenCalled();
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
        isAuth: false,
      };
      const state = mapStateToProps({
        currentUser: { isAuth: false },
      });
      expect(state).toEqual(expectedState);
    });

    it('Should call onLike', () => {
      mapped.onLike('slug');
      expect(dispatch).toHaveBeenCalled();
    });

    it('Should call onUnlike', () => {
      mapped.onUnlike('slug');
      expect(dispatch).toHaveBeenCalled();
    });

    it('Should call onToggleSocialModal', () => {
      mapped.onToggleSocialModal(true);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('Login actions', () => {
    beforeEach(() => {
      store = mockStore({});
      axiosInstance = axios;
      moxios.install(axiosInstance);
    });

    afterEach(() => {
      moxios.uninstall(axios);
    });

    test('Should call the `like` action with success', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/slug`,
        {
          status: 200,
          response: {},
        },
      );

      store.dispatch(like('slug')).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    test('Should call the `like` action with error', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/slug`,
        {
          status: 409,
          response: {},
        },
      );

      store.dispatch(like('slug')).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    test('Should call the `unLike` action with success', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/slug`,
        {
          status: 200,
          response: {},
        },
      );

      store.dispatch(unlike('slug')).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });

    test('Should call the `unLike` action with error', () => {
      moxios.stubRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/post/slug`,
        {
          status: 409,
          response: {},
        },
      );

      store.dispatch(unlike('slug')).then(() => {
        expect(store.getActions()).toMatchSnapshot();
      });
    });
  });
});
