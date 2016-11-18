var React = require('react');
var ReactDOM = require('react-dom');
var ContainerComponent = require('./components/ContainerComponent.jsx');

require('./styles/main.scss');

var root = ReactDOM.render(
  <ContainerComponent/>,
  document.getElementById("app-container")
);