import React from 'react';
import burgerLogo from '../../Assets/Images/burger-builder.png';
import classes from './logo.css';

const logo = props => (
  <div className={classes.logo}>
    <img src={burgerLogo} alt="Burger Builder"/>
  </div>
);

export default logo;