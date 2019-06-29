import React, {Component} from "react";
import axios from '../../axiosOrders';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Input from '../../Components/UI/Input/Input';
import classes from './contactInfo.css';

class Checkout extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name',
          value: ''
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          value: ''
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Address',
          value: ''
        }
      },
      zip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
          value: ''
        }
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'delivery', displayValue: 'Delivery'},
            {value: 'pickup', displayValue: 'Pickup'}
          ]
        }
      }
    },
    loading: false
  }

  orderBurger = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    }
    axios.post('orders.json', order).then(response => {
      this.setState({loading: false});
      this.props.history.push('/');
    }).catch(error => {
      console.log(error);
      this.setState({loading: false});
    });
  }

  render() {
    let form = (
      <form>
        <Input elementType="..." elementValue="..." value="..."/>
        <Input inputtype="input" type="email" name="email" placeholder="Email"/>
        <Input inputtype="input" type="text" name="street" placeholder="Address"/>
        <Input inputtype="input" type="text" name="zip" placeholder="Zip Code"/>
        <Button btnType="success" clicked={this.orderBurger}>ORDER</Button>
      </form>
    );
    if (this.state.loading) form = <Spinner/>
    return (
      <div className={classes.contactInfo}>
        <h4>Enter your contact info</h4>
        {form}
      </div>
    );
  }
}

export default Checkout;