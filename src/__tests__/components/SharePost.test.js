import React from 'react';
import { mount } from 'enzyme';
import SharePost from '../../components/SharePost/SharePost';
import renderer from 'react-test-renderer';

describe(`SharePost`, () => {
  const props = {
    show: true,
    handleClose: null,
  };
  it('should render `SharePost`', () => {
    const tree = renderer.create(<SharePost {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
