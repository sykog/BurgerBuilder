import React from 'react';
import {configure, shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import BuildControls from './BuildControls';

configure({adapter: new Adapter()});

describe('<BuildControls/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BuildControls price={4}/>);
  });

  it('should not allow ingredients with a count of 0 to be removed', () => {
    wrapper.setProps({ingredients: {ketchup: 0}});
    expect(wrapper.find('buildControl[label="Ketchup"]').prop('removeDisabled')).toEqual(true);
  });

  it('should allow ingredients with a count of more than 0 to be removed', () => {
    wrapper.setProps({ingredients: {ketchup: 1}});
    expect(wrapper.find('buildControl[label="Ketchup"]').prop('removeDisabled')).toEqual(false);
  });

  it('should allow patty ingredients with a count of 1 to be added', () => {
    wrapper.setProps({ingredients: {beef: 1}});
    expect(wrapper.find('buildControl[label="Beef"]').prop('addDisabled')).toEqual(false);
  });

  it('should not allow sauce ingredients with a count of 1 to be added', () => {
    wrapper.setProps({ingredients: {ketchup: 1}});
    expect(wrapper.find('buildControl[label="Ketchup"]').prop('addDisabled')).toEqual(true);
  });
});