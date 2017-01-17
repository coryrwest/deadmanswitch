import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLogin, updateEmail } from '../actions/actions.js';

import Login from './Login.jsx';


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

class PublicPagesComponent extends Component {
    render() {
        return <div>
                    <h2>Login</h2>
                    <p>Please enter your email address. This will act as your login, so do not forget what email you used.</p>
                    <p>We will send a login link to this email address whenever you want to login. You will have to click the link in the email in order to login.</p>
                    <Login
                        updateEmail={this.props.updateEmail}
                        createLogin={this.props.createLogin}
                        sendingLoginRequest={this.props.sendingLoginRequest}
                        email={this.props.email}
                    />
                </div>;
    }
};

const Public = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicPagesComponent)

export default Public;