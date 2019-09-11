import React from 'react';
import ContentLoader from '../../components/Helpers/ContentLoader';
import { mount } from 'enzyme';

describe('ContentLoader', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<ContentLoader />);
  });

  it('should render `ContentLoader`', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
