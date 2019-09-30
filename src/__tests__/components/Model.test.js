import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '../../components/Modal/Modal';

let wrapper;
const props = {
  handleClose: jest.fn(),
  show: true,
};
describe('Modal.jsx', () => {
  beforeEach(() => {
    wrapper = mount(<Modal {...props} />);
  });
  test('should render Header.jx', () => {
    wrapper = shallow(<Modal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
