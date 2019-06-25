import React, {Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
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
        <Toolbar drawerToggleClicked={this.toggleSideDrawer}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.closeSideDrawer}/>
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;