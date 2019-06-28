import React, {Component} from "react";
import axios from '../../axiosOrders';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import classes from './contactInfo.css';

class Checkout extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zip: ''
    },
    loading: false
  }

  orderBurger = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Antonio Suarez',
        address: {
          street: '12345 5th St SE',
          zip: '90000'
        },
        email: 'asuarez@mail.com'
      }
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
        <input className={classes.input} type="text" name="name" placeholder="Name"/>
        <input className={classes.input} type="text" name="email" placeholder="Email"/>
        <input className={classes.input} type="text" name="street" placeholder="Address"/>
        <input className={classes.input} type="text" name="zip" placeholder="Zip Code"/>
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