import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../Store/Actions/index';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {updateObject, validateInput} from "../../Shared/utility";
import classes from './authentication.css';

class Authentication extends Component {
  state = {
    loginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Login'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    registering: true
  }

  receiveInput = (event, selectedInput) => {
    const updatedForm = updateObject(this.state.loginForm, {
      [selectedInput]: updateObject(this.state.loginForm[selectedInput], {
        value: event.target.value,
        valid: validateInput(event.target.value, this.state.loginForm[selectedInput].validation),
        touched: true
      })
    });
    this.setState({loginForm: updatedForm});
  }

  submitForm = event => {
    event.preventDefault();
    this.props.onAuthenticate(this.state.loginForm.email.value,
      this.state.loginForm.password.value, this.state.registering);
  }

  toggleLoginRegister = () => {
    this.setState(previousState => {
      return {registering: !previousState.registering}
    });
  }

  render() {
    const formElements = [];
    for (let key in this.state.loginForm) {
      formElements.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    let inputs = formElements.map(formElement => (
      <Input key={formElement.id} elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value} invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation} touched={formElement.config.touched}
             changed={(event) => this.receiveInput(event, formElement.id)}/>
    ));
    if (this.props.loading) inputs = <Spinner/>;

    let errorMessage = null;
    if (this.props.error) errorMessage = <p>{this.props.error.message}</p>;

    let loggedInRedirect = null;
    if (this.props.loggedIn) {
      loggedInRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.auth}>
        <form onSubmit={this.submitForm}>
          {loggedInRedirect}
          {errorMessage}
          {inputs}
          <Button btnType="success">SUBMIT</Button>
        </form>
        <Button btnType="danger" clicked={this.toggleLoginRegister}>
          SWITCH TO {this.state.registering ? "LOGIN" : "REGISTER"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    loggedIn: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password, registering) => {
      dispatch(actions.authenticate(email, password, registering))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);