import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, mapStateToProps } from '../../components/Header/Header';
import initialState from '../../store/initialState';

let wrapper;
const props = {
  match: { path: '' },
};
describe('Header.jsx', () => {
  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Header {...props} />
      </Router>,
    );
  });
  test('should render Header.jx', () => {
    wrapper = shallow(<Header {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Header.jx', () => {
    const component = wrapper.find('Header');
    expect(component.props().match).toHaveProperty('path');
  });

  test('should render Header.jx with login user', () => {
    const newProps = { ...props, isAuth: true };
    wrapper = mount(
      <Router>
        <Header {...newProps} />
      </Router>,
    );
    const component = wrapper.find('Header');
    expect(component.props().isAuth).toBeTruthy();
  });

  describe('when clicking on `menu` button', () => {
    beforeEach(() => {
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>,
      );
    });
    test('should toggle `menu` state', () => {
      wrapper.find('button.navbar-toggler').simulate('click');
      const component = wrapper.find('Header');
      expect(component.state().menu).toBeTruthy();
    });
  });

  describe('when props changes', () => {
    beforeEach(() => {});

    test('should render `/login` as `active', () => {
      props.match.path = '/login';
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>,
      );
      const path = '/login';
      const component = wrapper.find('Header');
      expect(component.props().match.path).toBe(path);
    });

    test('should render `/signup` as `active`', () => {
      props.match.path = '/signup';
      wrapper = mount(
        <Router>
          <Header {...props} />
        </Router>,
      );
      const path = '/signup';
      const component = wrapper.find('Header');
      expect(component.props().match.path).toBe(path);
    });
  });

  describe('reducers', () => {
    test('should return `mapStateToProps`', () => {
      const expectedState = {
        isAuth: false,
        user: {},
      };
      const state = mapStateToProps(initialState);
      expect(state).toEqual(expectedState);
    });
  });
});
