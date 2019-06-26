import React, {Component} from 'react';
import classes from './model.css';
import Backdrop from '../Backdrop/Backdrop';

class Model extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log("Model updated");
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={classes.modal} style={{
          transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: this.props.show ? '1' : '0'
        }}>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Model;