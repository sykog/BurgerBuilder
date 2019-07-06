import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './HOC/Layouts/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Authentication from './Containers/Authentication/Authentication';
import Logout from './Containers/Authentication/Logout';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/login" component={Authentication}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App;
