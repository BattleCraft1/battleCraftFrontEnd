import * as types from '../types/security'

export function setTokenAndRole(token,role,username) {
    return {
        type: types.SET_TOKEN_AND_ROLE,
        token: token,
        role: role,
        username: username
    }
}

export function logout(token,role) {
    return {
        type: types.LOGOUT
    }
}