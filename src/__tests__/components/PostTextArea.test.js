import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import post from '../../actions/postActions';
import postReducer from '../../reducers/posts';
import {
    POST_ERROR,
    POST_SUCCESS,
    POST_STARTED,
} from '../../actionTypes/postTypes';
import { PostTextArea, mapDispatchToProps, mapStateToProps } from '../../components/PostTextArea/PostTextArea';

let wrapper;

const props = {
    minRows: 3,
    maxRows: 15,
    loading: false,
    error: false,
    tick: false,
    post: jest.fn()
};

describe('PostTextArea.jsx', () => {
    test('should render PostTextArea.jx', () => {
        wrapper = shallow(<PostTextArea {...props} />);
        const event = {
            target: {
                value: 'this is the post'
            }
        }
        wrapper.find('textarea').simulate('change', event)
        expect(wrapper.instance().state.value).toEqual(event.target.value);
    });

    test('should post', () => {
        wrapper = shallow(<PostTextArea {...props} />);
        const event = { target: { value: 'this is the post' } }
        wrapper.find('textarea').simulate('change', event)
        wrapper.find('Button').simulate('click')
        expect(props.post).toHaveBeenCalled();
    });

    test('should select the emage', () => {
        wrapper = shallow(<PostTextArea {...props} />);
        global.URL.createObjectURL = jest.fn(() => 'this is the imageUrl');
        const event = { target: { files: ['this is the image'] } }
        wrapper.find('input[name="image"]').simulate('change', event)
        expect(global.URL.createObjectURL).toHaveBeenCalled();
        expect(wrapper.instance().state.image).toEqual(event.target.files[0]);
    });

    test('should clear the image', () => {
        wrapper = shallow(<PostTextArea {...props} />);
        global.URL.createObjectURL = jest.fn(() => 'this is the imageUrl');
        const event = { target: { files: ['this is the image'] } }
        wrapper.find('input[name="image"]').simulate('change', event)
        wrapper.find('span').simulate('click')
        expect(wrapper.instance().state.imageUrl).toEqual('');
    });

    test('should add emoji', () => {
        wrapper = mount(
            <PostTextArea {...props} />
        );
        const emoji = { native: '&123' }
        wrapper.instance().addEmoji(emoji);
        expect(wrapper.instance().state.value).toEqual('&123');
    });

    describe('reducers', () => {
        test('should return `mapStateToProps`', () => {
            const expectedState = {
                loading: false,
                error: false,
                tick: false,
            };
            const state = mapStateToProps({ posts: { ...expectedState } });
            expect(state).toEqual(expectedState);
        });
        test('should return `mapDispatchToProps`', () => {
            const dispatch = action => action;
            const mappedObject = mapDispatchToProps(dispatch);
            expect(mappedObject).toHaveProperty('post');
            expect(mappedObject.post('post')).toEqual(expect.any(Function));
        });
    });
});

const mockStore = configureMockStore([thunk]);

describe('Post actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({
            events: {},
        });

        moxios.install(axios);
    });

    afterEach(() => {
        moxios.uninstall(axios);
    });

    it('should call the post action with success', () => {
        moxios.stubRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
            {
                status: 201,
                response: {
                    data: {
                        post: {
                            description: 'description',
                            image: 'image',
                        }
                    },
                },
            },
        );
        moxios.stubRequest(
            `${process.env.REACT_APP_CLOUDINARY_URL_IMAGE}`,
            {
                status: 201,
                response: {
                    data: {
                        secure_url: 'image.url'
                    },
                },
            },
        );
        store.dispatch(post({ value: 'value', image: 'image' })).then(res => {
            expect(res).toBe(true);
        });
    });

    it('should call the post action with error', () => {
        moxios.stubRequest(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
            {
                status: 201,
                response: {
                    data: {
                        post: {
                            description: 'description',
                            image: 'image',
                        }
                    },
                },
            },
        );
        moxios.stubRequest(
            `${process.env.REACT_APP_CLOUDINARY_URL_IMAGE}`,
            {
                status: 400,
                response: {
                    data: {
                        secure_url: 'image.url'
                    },
                },
            },
        );
        store.dispatch(post({ value: 'value', image: 'image' })).then(res => {
            expect(res).toBe(true);
        });
    });
});

describe('Post reducer', () => {
    it('should test the reducer with type LOGIN_ERROR', () => {
        const state = postReducer({}, { type: POST_ERROR, payload: {} });
        expect(state.loading).toBe(false);
    });

    it('should test the reducer with type LOGIN_SUCCESS', () => {
        const state = postReducer({}, { type: POST_SUCCESS, payload: {} });
        expect(state.error).toBe(false);
    });

    it('should test the reducer with type LOGIN_STARTED', () => {
        const state = postReducer({}, { type: POST_STARTED, payload: {} });
        expect(state.loading).toBe(true);
    });

    it('should test the reducer with type default', () => {
        const state = postReducer({}, { type: 'default', payload: {} });
        expect(state).toEqual(expect.any(Object));
    });
});
