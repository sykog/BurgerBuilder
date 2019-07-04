import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems';
import BackDrop from '../../UI/Backdrop/Backdrop'
import classes from './sidedrawer.css';

const sideDrawer = props => {
  let attatchedClasses = [classes.sideDrawer, classes.close];
  if (props.open) attatchedClasses = [classes.sideDrawer, classes.open];

  return (
    <React.Fragment>
      <BackDrop show={props.open} clicked={props.closed}/>
      <div className={attatchedClasses.join(" ")}>
        <div className={classes.logo}>
          <Logo/>
        </div>
        <nav>
          <NavItems authenticated={props.authenticated}/>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default sideDrawer;