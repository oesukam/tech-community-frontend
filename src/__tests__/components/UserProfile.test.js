import React from 'react';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import UserProfile, {
  UserProfile as UserProfileComponent,
} from '../../components/UserProfile/UserProfile';

describe('UserProfile Component', () => {
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({});

  it('should render `UserProfile`', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <UserProfile />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('Should render `left-box`', () => {
    const props = { loading: false, error: null, change: jest.fn() };
    it('Should Render `Loader`', () => {
      props.loading = true;
      const wrapper = mount(<UserProfileComponent {...props} />);
      const button = wrapper.find('#loader');
      expect(button.length).toBe(1);
    });

    it('Should Render `renderProfileDetails`', () => {
      props.loading = false;
      const wrapper = mount(<UserProfileComponent {...props} />);
      const button = wrapper.find('#change-profile-image-button');
      expect(button.length).toBe(1);
    });

    it('Should Render `Error Message`', () => {
      props.error = 'Network Error';
      const wrapper = mount(<UserProfileComponent {...props} />);
      const button = wrapper.find('#error-message');
      expect(button.length).toBe(1);
    });
  });
});
