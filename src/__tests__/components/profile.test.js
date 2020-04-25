import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Profile, mapStateToProps } from '../../components/Profile/Profile';
import initialState from '../../store/initialState';

const props = {
  match: { path: '' },
  location: {
    search: {},
  },
  user: {
    user: {
      picture: 'http://picture.jpg',
    },
  },
  handleShowAndHide: jest.fn(),
};

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  ...initialState,
});

mapStateToProps({ currentUser: { details: {} } });

const profile = mount(
  <MemoryRouter>
    <Provider store={store}>
      <Profile {...props} />
    </Provider>
  </MemoryRouter>,
);

describe('Profile.jsx', () => {
  test('should render Profile.jx', () => {
    expect(profile).toMatchSnapshot();
    expect(profile.find('.profile').exists()).toEqual(true);
  });
});
