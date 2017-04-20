import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../actions/actions.js';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticate: (hash) => {
        dispatch(authenticate(hash))
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