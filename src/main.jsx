import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import ContainerComponent from './components/ContainerComponent.jsx';
import reducers from './reducers/reducers.js';

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
    <ContainerComponent/>
  </Provider>,
  document.getElementById("app-container")
);