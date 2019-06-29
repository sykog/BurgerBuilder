import React from 'react';
import classes from './navItems.css';
import NavigationItem from './NavigationItem';

const navItems = props => (
  <ul className={classes.navItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navItems;