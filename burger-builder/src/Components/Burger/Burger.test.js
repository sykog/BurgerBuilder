import React from 'react';
import {configure, shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import Burger from './Burger';
import BurgerIngredient from './BurgerIngredient';;

configure({adapter: new Adapter()});

describe('<Burger/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Burger.WrappedComponent ingredients={{bacon: 0}}/>);
  });

  it('should render only a bottom and top bun', () => {
    expect(wrapper.find(BurgerIngredient)).toHaveLength(2);
  });

  it('should render 2 more ingredients', () => {
    wrapper.setProps({ingredients: {bacon: 2}});
    expect(wrapper.find(BurgerIngredient)).toHaveLength(4);
  });

  it('should no longer ask to add ingredients', () => {
    wrapper.setProps({ingredients: {bacon: 2}});
    expect(wrapper.contains('p')).toEqual(false);
  });
});