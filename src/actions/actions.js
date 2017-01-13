import * as types from '../constants/actionTypes'
import * as names from '../constants/names'
import cookie from 'react-cookie';
var apigClientFactory = require('aws-api-gateway-client')


var config = { 
  invokeUrl: 'https://3g5rj8p1u2.execute-api.us-west-2.amazonaws.com/prod' ,
  apiKey: 'iGL67IJaSN9EtnWYnXAvw6u3iDbGFfuU7r2lIaX2'
}
var apigClient = apigClientFactory.newClient(config);

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

export function loginCreated() {
  return { type: types.LOGIN_CREATED }
}

export function sendingLogin() {
  return { type: types.SENDING_LOGIN_REQUEST }
}

export function logout() {
  // Delete the cookie and refresh
}

export function updateEmail(email) {
  return { type: types.UPDATE_EMAIL, email }
}