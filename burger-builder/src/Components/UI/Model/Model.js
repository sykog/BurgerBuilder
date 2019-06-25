import React from 'react';
import classes from './model.css';
import Backdrop from '../Backdrop/Backdrop';

const model = props => (
  <React.Fragment>
    <Backdrop show={props.show} clicked={props.modalClosed}/>
    <div className={classes.modal} style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? '1' : '0'
    }}>
      {props.children}
    </div>
  </React.Fragment>
);

export default model;