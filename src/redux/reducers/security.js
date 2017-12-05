import createReducer from '../lib/createReducer'
import * as types from '../types/security'

import Cookies from 'universal-cookie';

const cookies = new Cookies('auth');

export const security = createReducer( {}, {
    [types.SET_TOKEN_AND_ROLE]( state, action ) {
        return {
            token: action.token,
            role: action.role,
            username: action.username
        };
    },
    [types.LOGOUT]( state, action ) {
        cookies.remove('role', { path: '/' });
        cookies.remove('token', { path: '/' });
        cookies.remove('username', { path: '/' });
        return {
            token: '',
            role: '',
            username: ''
        };
    }
} );