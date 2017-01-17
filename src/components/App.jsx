import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createLogin, updateEmail } from '../actions/actions.js';
import { Link } from 'react-router';

const mapStateToProps = (state) => {
  return state;
}

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
          <ul role="nav">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
          {this.props.children}
        </div>;
    }
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default App;