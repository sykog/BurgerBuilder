import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../Store/Actions/index';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {updateObject, validateInput} from "../../Functions/utility";
import classes from './authentication.css';

const Authentication = props => {
  
  const [loginForm, setLoginForm] = useState({
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
  });
  const [registering, setRegistering] = useState(true);

  const receiveInput = (event, selectedInput) => {
    const updatedForm = updateObject(loginForm, {
      [selectedInput]: updateObject(loginForm[selectedInput], {
        value: event.target.value,
        valid: validateInput(event.target.value, loginForm[selectedInput].validation),
        touched: true
      })
    });
    setLoginForm(updatedForm);
  };

  const submitForm = event => {
    event.preventDefault();
    props.onAuthenticate(loginForm.email.value,
      loginForm.password.value, registering);
  };

  const toggleLoginRegister = () => {
    setRegistering(!registering);
  };

  const formElements = [];
  for (let key in loginForm) {
    formElements.push({
      id: key,
      config: loginForm[key]
    });
  }

  let inputs = formElements.map(formElement => (
    <Input key={formElement.id} elementType={formElement.config.elementType}
           elementConfig={formElement.config.elementConfig}
           value={formElement.config.value} invalid={!formElement.config.valid}
           shouldValidate={formElement.config.validation} touched={formElement.config.touched}
           changed={(event) => receiveInput(event, formElement.id)}/>
  ));
  if (props.loading) inputs = <Spinner/>;

  let errorMessage = null;
  if (props.error) errorMessage = <p>{props.error.message}</p>;

  let loggedInRedirect = null;
  if (props.loggedIn) {
    loggedInRedirect = <Redirect to="/" />;
  }

  return (
    <div className={classes.auth}>
      <form onSubmit={submitForm}>
        {loggedInRedirect}
        {errorMessage}
        {inputs}
        <Button btnType="success">SUBMIT</Button>
      </form>
      <Button btnType="danger" clicked={toggleLoginRegister}>
        SWITCH TO {registering ? "LOGIN" : "REGISTER"}
      </Button>
    </div>
  );
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