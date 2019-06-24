import React from 'react';
import BuildControl from './BuildControl'
import classes from './buildControls.css';

const controlsList = [
  {label: 'Lettuce', type: 'lettuce'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Patty', type: 'patty'}
]

const buildControls = props => (
  <div className={classes.buildControls}>
    {controlsList.map(control => (
      <BuildControl key={control.label} label={control.label}/>
    ))}
  </div>
);

export default buildControls;