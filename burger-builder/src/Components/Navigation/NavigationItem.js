import React from 'react';
import classes from './navItems.css';

const navigationItem = props => (
  <li className={classes.navItem}>
    <a href={props.link} className={props.active ? classes.active: null}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;