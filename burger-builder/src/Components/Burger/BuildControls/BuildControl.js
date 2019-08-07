import React from 'react';
import classes from './buildControl.css';

const buildControl = props => (
  <div className={classes.buildControl}>
    <div className={classes.label}>{props.label}</div>
    <button className={classes.more} onClick={props.added} disabled={props.addDisabled}>More</button>
    <button className={classes.less} onClick={props.removed} disabled={props.removeDisabled}>Less</button>
  </div>
);

export default buildControl;