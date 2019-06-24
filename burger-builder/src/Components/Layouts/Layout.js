import React from 'react';
import classes from './layout.css';

const layout = props => (
  <React.Fragment>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </React.Fragment>
);

export default layout