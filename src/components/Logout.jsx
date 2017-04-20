import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/actions.js';

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: (email) => {
        dispatch(logout(email))
    }
  }
}

class LogoutComponent extends Component {
    render() {
        this.props.logout(this.props.email);
        
        return <div>
            Logging out
        </div>;
    }
};

const Logout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutComponent)

export default Logout;