import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createLogin, updateEmail } from '../actions/actions.js';
import { Link } from 'react-router';

// Used to subscribe to store updates
const mapStateToProps = (state) => {
  return state;
}

// Used to dispatch actions that change state
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createLogin: (email) => {
        dispatch(createLogin(email))
    },
    updateEmail: (email) => {
        dispatch(updateEmail(email))
    }
  }
}

class AppComponent extends Component {
    render() {
        return <div>
          <span>This app is just a fun project. It makes no attempt to be secure in any meaningful way.</span>
          <ul role="nav">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
          {this.props.children}
        </div>;
    }
};

// How you connect the Provider to the Component to allow automatic state updating
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App;