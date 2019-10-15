import React from 'react';
import { shallow } from 'enzyme';
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

const profile = shallow(<Profile store={store} {...props} />);

describe('Profile.jsx', () => {
  test('should render Profile.jx', () => {
    expect(profile).toMatchSnapshot();
    expect(profile.find('.profile').exists()).toEqual(true);
  });
});
