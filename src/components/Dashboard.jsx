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

class AlarmRow extends Component {
  render() {
    return <tr></tr>;
  }
}

class DashboardComponent extends Component {
    render() {
        return <div>
                  <div>
                    Alarms
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Subject</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.props.alarms.length == 0 ? "You have no alarms" : this.props.alarms.map(() => {
                        <AlarmRow />
                      })}
                      </tbody>
                    </table>
                  </div>
                </div>;
    }
};

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardComponent)

export default Dashboard;