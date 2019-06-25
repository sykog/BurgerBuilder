import React from 'react';
import burgerLogo from '../../Assets/Images/burger-logo.png';
import classes from './logo.css';

const logo = props => (
  <div className={classes.logo}>
    <img src={burgerLogo} alt="Burger Builder"/>
  </div>
);

export default logo;