import * as types from '../constants/actionTypes'
import * as names from '../constants/names'
import cookie from 'react-cookie';

// Load cookies
var email = cookie.load(names.EMAIL_COOKIE) || '';
var auth = cookie.load(names.AUTH_COOKIE) || '';

const initialState = {
    email: email,
    authenticated: (auth !=+ null && auth !== undefined),
    authCookie: auth,
    sendingLoginRequest: false,
    alarms: []
}

function reducers(state = initialState, action) {
    switch(action.type) {
        case types.SENDING_LOGIN_REQUEST:
            return Object.assign({}, state, {
                sendingLoginRequest: true
            });
        case types.CREATE_LOGIN:
            return Object.assign({}, state, {
                authenticated: true
            });
        case types.LOGIN_CREATED:
            return Object.assign({}, state, {
                sendingLoginRequest: false
            });
        case types.UPDATE_EMAIL:
            return Object.assign({}, state, {
                email: action.email
            });
        default:
            return state;
    }
}

export default reducers;