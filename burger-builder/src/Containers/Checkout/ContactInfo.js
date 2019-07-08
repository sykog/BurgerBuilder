import React, {Component} from "react";
import axios from '../../axiosOrders';
import {connect} from 'react-redux';
import * as actions from '../../Store/Actions/index'
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler'
import {updateObject, validateInput} from '../../Actions/utility';
import classes from './contactInfo.css';

class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'delivery', displayValue: 'Delivery'},
            {value: 'pickup', displayValue: 'Pickup'}
          ]
        },
        value: 'delivery',
        validation: {},
        valid: true,
        touched: false
      }
    },
    validForm: false
  }

  receiveInput = (event, selectedInput) => {
    const formElement = updateObject(this.state.orderForm[selectedInput], {
      value: event.target.value,
      valid: validateInput(event.target.value, this.state.orderForm[selectedInput].validation),
      touched: true
    });
    const updatedForm = updateObject(this.state.orderForm, {
      [selectedInput]: formElement
    });

    let validForm = true;
    for (let inputName in updatedForm) {
      validForm = updatedForm[inputName].valid && validForm;
    }
    this.setState({orderForm: updatedForm, validForm: validForm});
  }

  orderBurger = event => {
    event.preventDefault();
    const formData = {};

    for (let inputIdentifier in this.state.orderForm) {
      formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order)
  }

  render() {
    const formElements = [];
    for (let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderBurger}>
        {formElements.map(formElement => (
          <Input key={formElement.id} elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation} touched={formElement.config.touched}
              changed={(event) => this.receiveInput(event, formElement.id)}/>
        ))}
        <Button btnType="success" disabled={!this.state.validForm}>ORDER</Button>
      </form>
    );
    if (this.props.loading) form = <Spinner/>
    return (
      <div className={classes.contactInfo}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId
  };
};

const matchDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.completePurchase(orderData))
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandler(ContactInfo, axios));