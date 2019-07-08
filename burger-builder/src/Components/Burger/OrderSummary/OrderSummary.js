import React, {Component} from 'react';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ingredient => {
      return (
        <li key={ingredient}>
          <span style={{textTransform: 'capitalize'}}>{ingredient}:</span>
          {this.props.ingredients[ingredient]}
        </li>);
    });

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p><strong>Total: ${this.props.price.toFixed(2)}</strong></p>
        <p>A delicious burger with the ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <Button btnType="success" clicked={this.props.continue}>Continue</Button>
        <Button btnType="danger" clicked={this.props.cancel}>Cancel</Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;