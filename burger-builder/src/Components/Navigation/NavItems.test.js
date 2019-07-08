import React from 'react';
import {configure, shallow} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import NavItems from './NavItems';
import NavigationItem from './NavigationItem';

configure({adapter: new Adapter()});

describe('<NavItems/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems/>);
  });

  it('should render 2 nav items if not logged in', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render 3 nav items if logged in', () => {
    wrapper.setProps({authenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should have a logout nav item if logged in', () => {
    wrapper.setProps({authenticated: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});