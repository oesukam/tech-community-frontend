import React from 'react';
import TimeAgo from '../../components/Helpers/TimeAgo';
import { mount } from 'enzyme';

describe('TimeAgo', () => {
  let wrapper;
  const date = new Date().getTime();

  beforeAll(() => {
    wrapper = mount(<TimeAgo date={date} />);
  });

  it('should return the date in `time ago` format', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.text()).toBe('il y a quelques secondes');
  });
});
