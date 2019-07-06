import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from './Store/Actions/index';
import Layout from './HOC/Layouts/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Authentication from './Containers/Authentication/Authentication';
import Logout from './Containers/Authentication/Logout';

class App extends Component {
  componentDidMount() {
    this.props.onReloadLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/login" component={Authentication}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.loggedIn) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
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
