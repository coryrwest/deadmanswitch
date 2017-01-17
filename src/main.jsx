import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import { Router, Route, hashHistory } from 'react-router'
import reducers from './reducers/reducers.js';

import Public from './components/Public.jsx';
import AboutText from './components/AboutText.jsx';
import App from './components/App.jsx';
import Dashboard from './components/Dashboard.jsx';
import Authenticate from './components/Authenticate.jsx';
import PageNotFound from './components/PageNotFound.jsx';

require('./styles/main.scss');

let store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware
  )
)

store.dispatch({type: 'start'})

var root = ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="dashboard" component={Dashboard} />
        <Route path="about" component={AboutText} />
      </Route>
      <Route path="/login" component={Public} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="*" component={PageNotFound} />
    </Router>
  </Provider>,
  document.getElementById("app-container")
);