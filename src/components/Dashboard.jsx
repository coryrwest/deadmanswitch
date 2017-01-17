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

class DashboardComponent extends Component {
    render() {
        return <div>
                    Dashboard
                </div>;
    }
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent)

export default Dashboard;