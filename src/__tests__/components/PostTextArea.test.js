import React from 'react';
import { shallow, mount } from 'enzyme';
import PostTextArea from '../../components/PostTextArea/PostTextArea';

let wrapper;

const props = {
  minRows: 3,
  maxRows: 15,
  loading: false,
  error: false,
  tick: false,
  post: jest.fn(),
};

describe('PostTextArea.jsx', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render PostTextArea.jx', () => {
    wrapper = shallow(<PostTextArea {...props} />);
    const event = {
      target: {
        value: 'this is the PostTextArea',
      },
    };
    wrapper.find('textarea').simulate('change', event);
    expect(wrapper.instance().state.value).toEqual(event.target.value);
  });

  test('should PostTextArea', () => {
    const newProps = { ...props, allowImagePicker: false };
    wrapper = shallow(<PostTextArea {...newProps} />);
    const event = { target: { value: 'this is the PostTextArea' } };
    wrapper.find('textarea').simulate('change', event);
    wrapper.find('Button').simulate('click');

    expect(newProps.post).toHaveBeenCalled();
  });

  test('should select the emage', () => {
    wrapper = shallow(<PostTextArea {...props} />);
    global.URL.createObjectURL = jest.fn(() => 'this is the imageUrl');
    const event = { target: { files: ['this is the image'] } };
    wrapper.find('input[name="image"]').simulate('change', event);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(wrapper.instance().state.image).toEqual(event.target.files[0]);
  });

  test('should clear the image', () => {
    wrapper = shallow(<PostTextArea {...props} />);
    global.URL.createObjectURL = jest.fn(() => 'this is the imageUrl');
    const event = { target: { files: ['this is the image'] } };
    wrapper.find('input[name="image"]').simulate('change', event);
    wrapper.find('.remove-image').simulate('click');
    expect(wrapper.instance().state.imageUrl).toEqual('');
  });

  test('should add emoji', () => {
    wrapper = mount(
      <PostTextArea {...props} />,
    );
    const emoji = { native: '&123' };
    wrapper.instance().addEmoji(emoji);
    expect(wrapper.instance().state.value).toEqual('&123');
  });

  test('should show emoji picker', () => {
    wrapper = mount(
      <PostTextArea {...props} />,
    );
    wrapper.instance().toogleOnClickEmojiPicker();
    expect(wrapper.instance().state.showEmojiPicker).toEqual(true);
  });

  test('should hide emoji picker', () => {
    wrapper = mount(
      <PostTextArea {...props} />,
    );
    const event = {
      target: { id: 'id', parentNode: { classList: 'this is the classList' } },
    };
    wrapper.find('button').simulate('click', event);
    expect(wrapper.instance().state.showEmojiPicker).toEqual(false);
  });

  test('should show the modal', () => {
    wrapper = mount(
      <PostTextArea {...props} />,
    );
    wrapper.instance().showModal();
    expect(wrapper.instance().state.show).toEqual(true);
  });

  test('should hide the modal', () => {
    wrapper = mount(
      <PostTextArea {...props} />,
    );
    wrapper.instance().hideModal();
    expect(wrapper.instance().state.show).toEqual(false);
  });
});
