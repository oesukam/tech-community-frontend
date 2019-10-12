import React from 'react';
import { mount } from 'enzyme';
import ContentLoader from '../../components/Helpers/ContentLoader';

describe('ContentLoader', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<ContentLoader />);
  });

  it('should render `ContentLoader`', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
