import React from 'react';
import classes from './navItems.css';
import NavigationItem from './NavigationItem';

const navItems = props => (
  <ul className={classes.navItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.authenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.authenticated ? <NavigationItem link="/login">Login</NavigationItem> :
      <NavigationItem link="/logout">Logout</NavigationItem>}
  </ul>
);

export default navItems;