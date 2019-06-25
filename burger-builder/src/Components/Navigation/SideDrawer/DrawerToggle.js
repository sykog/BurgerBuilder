import React from 'react';
import classes from './drawerToggle.css';

const drawerToggle = props => (
  <div onClick={props.clicked} className={classes.drawerToggle}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;