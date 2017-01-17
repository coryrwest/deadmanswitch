import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createLogin, updateEmail } from '../actions/actions.js';

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

class AuthenticateComponent extends Component {
    render() {
        return <div>
                    Authenticated
                </div>;
    }
};

const Authenticate = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateComponent)

export default Authenticate;