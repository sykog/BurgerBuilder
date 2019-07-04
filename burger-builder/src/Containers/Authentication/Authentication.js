import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
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
    const updatedForm = {
      ...this.state.loginForm,
      [selectedInput]: {
        ...this.state.loginForm[selectedInput],
        value: event.target.value,
        valid: this.validateInput(event.target.value, this.state.loginForm[selectedInput].validation),
        touched: true
      }
    };

    this.setState({loginForm: updatedForm});
  }

  validateInput = (value, rules) => {
    let valid = true;
    if (rules.required) valid = value.trim() !== '' && valid;
    if (rules.minLength) valid = value.length >= rules.minLength && valid;
    if (rules.maxLength) valid = value.length <= rules.maxLength && valid;

    return valid;
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

    return (
      <div className={classes.auth}>
        <form onSubmit={this.submitForm}>
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
    error: state.auth.error
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