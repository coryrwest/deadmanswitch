import * as types from '../constants/actionTypes'
import * as names from '../constants/names'
import cookie from 'react-cookie';
const apigClientFactory = require('aws-api-gateway-client')

const config = { 
  invokeUrl: 'https://3g5rj8p1u2.execute-api.us-west-2.amazonaws.com/prod' ,
  apiKey: 'iGL67IJaSN9EtnWYnXAvw6u3iDbGFfuU7r2lIaX2'
}

const apigClient = apigClientFactory.newClient(config);

export function createLogin(email) {
  return function(dispatch) {
    dispatch(sendingLogin());
    // Send request to make login
    var params = {
      email
    }
    var pathTemplate = '/v1/users'
    var method = 'GET';
    apigClient.invokeApi(params, pathTemplate, method, {headers:{}, queryParams:{}}, {})
    .then(function(result){
      // When request comes back dispatch loginComplete and wait for email
      cookie.save(names.EMAIL_COOKIE, email);
      dispatch(loginCreated());
    }).catch(function(result){
      dispatch(loginCreated());
      throw new Error(JSON.stringify(result))
    });
  }
}

export function authenticate(email, hash) {
  return function(dispatch) {
    // Send request to auth
    var params = {
      email,
      hash
    }
    var pathTemplate = '/v1/users'
    var method = 'GET';
    apigClient.invokeApi(params, pathTemplate, method, {headers:{}, queryParams:{}}, {})
    .then(function(result){
      if (result.authenticated) {
        // When request comes back dispatch loginComplete and wait for email
        cookie.save(names.AUTH_COOKIE, hash);
        cookie.save(names.EMAIL_COOKIE, email);
      } else {
        dispatch(logout());
      }
      dispatch(authenticated());
    }).catch(function(result){
      dispatch(logout());
      throw new Error(JSON.stringify(result))
    });
  }
}

export function loginCreated() {
  return { type: types.LOGIN_CREATED }
}

export function authenticated() {
  return { type: types.LOGIN_CREATED }
}

export function logout() {
  // Delete the cookie and refresh
  cookie.remove(names.AUTH_COOKIE);
  return { type: types.LOGOUT }
}

export function sendingLogin() {
  return { type: types.SENDING_LOGIN_REQUEST }
}

export function updateEmail(email) {
  return { type: types.UPDATE_EMAIL, email }
}