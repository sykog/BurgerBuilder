import React, {Component} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import classes from './layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  closeSideDrawer = () => {
    this.setState({showSideDrawer: false});
  }

  toggleSideDrawer = () => {
    this.setState((previousState) => {
      return {showSideDrawer: !previousState.showSideDrawer}
    });
  }

  render() {
    return (
      <React.Fragment >
        <Toolbar drawerToggleClicked={this.toggleSideDrawer} authenticated={this.props.loggedIn}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawer}
                    authenticated={this.props.loggedIn}/>
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);