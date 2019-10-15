import React from 'react';
import { shallow } from 'enzyme';
import SinglePost from '../../pages/SinglePost/SinglePost';

let wrapper;

const props = {
  match: { params: { slug: 'slug' } }, location: {},
};

describe('Post.jsx', () => {
  test('should render Post.jx', () => {
    wrapper = shallow(<SinglePost {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
