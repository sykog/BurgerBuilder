import React from 'react';
import classes from './input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.inputElement];

  if (props.invalid && props.validation && props.touched) {
    inputClasses.push(classes.invalid)
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig}
          value={props.value} onChange={props.changed}/>;
      break;
    case('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig}
          value={props.value} onChange={props.changed}/>
      break;
    case('select'):
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig}
          value={props.value} onChange={props.changed}/>;
  }
  return (
    <div className={classes.input}>
      <label>{props.input}</label>
      {inputElement}
    </div>
  );
}

export default input;