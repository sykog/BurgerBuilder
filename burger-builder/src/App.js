import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from './Store/Actions/index';
import Layout from './HOC/Layouts/Layout';
import asyngComponent from './HOC/Async/asyncComponent';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Authentication/Logout';

const asyncCheckout = asyngComponent(() => {
  return import('./Containers/Checkout/Checkout');
});
const asyncOrders = asyngComponent(() => {
  return import('./Containers/Orders/Orders');
});
const asyncAuth = asyngComponent(() => {
  return import('./Containers/Authentication/Authentication');
});

class App extends Component {
  componentDidMount() {
    this.props.onReloadLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={asyncCheckout}/>
        <Route path="/login" component={asyncAuth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.loggedIn) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/login" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReloadLogin: () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
