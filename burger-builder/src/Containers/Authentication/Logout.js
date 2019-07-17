import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../Store/Actions/index';

const Logout = props => {

  useEffect(() => {
    props.onLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to=""/>;
}

const matchDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, matchDispatchToProps)(Logout);