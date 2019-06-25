import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './layout.css';

const layout = props => (
  <React.Fragment>
    <Toolbar/>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout