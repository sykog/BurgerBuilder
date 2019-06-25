import React from 'react';
import classes from './navItems.css';
import NavigationItem from './NavigationItem';

const navItems = props => (
  <ul className={classes.navItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </ul>
);

export default navItems;