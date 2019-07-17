import React, {useState} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import classes from './layout.css';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  }

  const toggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <React.Fragment >
      <Toolbar drawerToggleClicked={toggleSideDrawer} authenticated={props.loggedIn}/>
      <SideDrawer open={showSideDrawer} closed={closeSideDrawer}
                  authenticated={props.loggedIn}/>
      <main className={classes.content}>{props.children}</main>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);