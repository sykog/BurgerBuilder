import React from 'react';
import classes from './toolbar.css';
import Logo from '../../Logo/Logo'
import NavItems from '../NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = props => (
  <header className={classes.toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <div className={classes.logo}>
      <Logo/>
    </div>
    <nav className={classes.mobile}>
      <NavItems authenticated={props.authenticated}/>
    </nav>
  </header>
);

export default toolbar;