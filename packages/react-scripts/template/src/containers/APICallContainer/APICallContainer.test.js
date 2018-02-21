import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import { makeStore } from 'store';
import { APICallContainer, mapStateToProps, mapDispatchToProps } from './APICallContainer';

const store = makeStore();

describe('APICallContainer', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <APICallContainer />
      </Provider>);
    expect(wrapper).toBeDefined();
  });

  it('renders the APICall Component', () => {
    const fetchMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <APICallContainer fetchData={fetchMock} />
      </Provider>);
    expect(wrapper.find('.APICall').length).toBe(1);
  });

  it('maps state and dispatch to props', () => {
    const fetchData = jest.fn();
    const wrapper = shallow(<APICallContainer fetchData={fetchData} />);
    expect(wrapper.props()).toEqual(expect.objectContaining({
      fetchData: expect.any(Function),
    }));
  });

  it('calls mapStateToProps properly', () => {
    const mockData = {
      data: true,
      hasLoaded: true,
    };
    const mockState = {
      APICall: mockData,
    }
    const result = mapStateToProps(mockState);
    expect(result).toEqual(mockData);
  });

  it('calls mapDispatchToProps properly', () => {
    const mockDispatch = jest.fn();
    const result = mapDispatchToProps(mockDispatch);
    expect(result).toEqual(expect.objectContaining({
      fetchData: expect.any(Function),
    }));

    result.fetchData('');
    expect(mockDispatch).toHaveBeenCalled();
  });
});
