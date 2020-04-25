import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import TagsDropDown from '../../components/TagsDropDown';
import initialState from '../../store/initialState';

const mockStore = configureMockStore([thunk]);

describe('TagsDropDown', () => {
  let wrapper;
  let store;

  const props = {
    onTagsSelected: jest.fn(),
  };

  beforeAll(() => {
    store = mockStore({ ...initialState });
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <TagsDropDown {...props} />
        </Router>
        ,
      </Provider>,
    );
  });

  it('should render `TagsDropDown`', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
