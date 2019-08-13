import React from 'react';
import {configure, shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initializeIngredients={() => {}}/>);
  });

  it('should render Build Controls when receiving ingredients', () => {
    wrapper.setProps({ingredients: {lettuce: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });

});