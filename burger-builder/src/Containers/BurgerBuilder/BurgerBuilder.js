import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger'

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      lettuce: 0,
      bacon: 0,
      cheese: 0,
      patty: 0
    }
  }

  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;