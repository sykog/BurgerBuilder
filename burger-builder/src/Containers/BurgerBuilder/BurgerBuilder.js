import React, {Component} from 'react';
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

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
        <BuildControls/>
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;