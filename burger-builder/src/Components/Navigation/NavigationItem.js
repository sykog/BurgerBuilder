import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './navItems.css';

const navigationItem = props => (
  <li className={classes.navItem}>
    <NavLink to={props.link} exact={props.exact} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;