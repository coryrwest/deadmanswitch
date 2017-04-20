import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import reducers from './reducers/reducers.js';

import Public from './components/Public.jsx';
import AboutText from './components/AboutTextC.jsx';
import App from './components/App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Authenticate from './components/Authenticate.jsx';
import PageNotFound from './components/PageNotFoundC.jsx';
import Logout from './components/Logout.jsx';

require('./styles/main.scss');

// Creates store for redux
// Thunk used to return functions from actions, see 'createLogin' action
let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
)

// No type for 'start' will default to returning initial state
store.dispatch({type: 'start'})

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    props.authenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

let root = ReactDOM.render(
  // Provider for redux. Root object that holds state and allows dispatching actions?
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <PrivateRoute path="dashboard" component={Dashboard} />
        <PrivateRoute path="/logout" component={Logout} />
      </Route>
      <Route path="/login" component={Public} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/about" component={AboutText} />
      <Route path="*" component={PageNotFound} />
    </Router>
  </Provider>,
  document.getElementById("app-container")
);