import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createLogin, updateEmail } from '../actions/actions.js';
import NavTabsComponent from './NavTabsComponent.jsx';

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

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavTabsComponent)

export default ContainerComponent;