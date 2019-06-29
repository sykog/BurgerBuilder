import React from 'react';
import classes from './input.css';

const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={classes.inputElement} {...props.elementConfig}
      value={props.value}/>;
      break;
    case('textarea'):
      inputElement = <textarea className={classes.inputElement} {...props.elementConfig}
      value={props.value}/>
      break;
    default:
      inputElement = <input className={classes.inputElement} {...props.elementConfig}
      value={props.value}/>;
  }
  return (
    <div className={classes.input}>
      <label>{props.input}</label>
      {inputElement}
    </div>
  );
}

export default input;