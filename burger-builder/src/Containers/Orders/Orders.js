import React, {Component} from 'react';
import axios from '../../axiosOrders';
import Order from '../../Components/Order/Order';
import withErrorHandler from '../../HOC/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {
    axios.get('orders.json').then(response => {
      const orders = [];
      for (let key in response.data) {
        orders.push({...response.data[key], id: key})
      }

      this.setState({loading: false, orders: orders});
    }).catch(error => {

    });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);