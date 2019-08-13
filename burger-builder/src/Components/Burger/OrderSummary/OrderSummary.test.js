import React from 'react';
import {configure, shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import OrderSummary from "./OrderSummary";

configure({adapter: new Adapter()});

describe('<OrderSummary/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrderSummary ingredients={{beef: 1}} price={4}/>);
  });

  it('should on display ingredients that have been added to the burger', () => {
    wrapper.setProps({ingredients: {beef: 1, bacon: 2, cheese: 0}});
    expect(wrapper.find('li')).toHaveLength(2);
  });

  it('should show the quantity of ingredients with a count greater than 1', () => {
    wrapper.setProps({ingredients: {beef: 2}});
    expect(wrapper.find('li').text()).toEqual('beef (2)');
  });

  it('should not show the quantity of ingredients with a count of 1', () => {
    console.log(wrapper.find('li').text());
    expect(wrapper.find('li').text()).toEqual('beef');
  });
});