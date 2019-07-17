import React, {Suspense, useEffect} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from './Store/Actions/index';
import Layout from './HOC/Layouts/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Logout from './Containers/Authentication/Logout';
import Spinner from './Components/UI/Spinner/Spinner';

const Checkout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./Containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./Containers/Authentication/Authentication');
});

const App = props => {
  useEffect(() => {
    props.onReloadLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes = (
    <Switch>
      <Route path="/checkout" render={() => <Checkout/>}/>
      <Route path="/login" render={() => <Auth/>}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );
  if (props.loggedIn) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout/>}/>
        <Route path="/orders" render={() => <Orders/>}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/login" render={() => <Auth/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner/>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  )
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
