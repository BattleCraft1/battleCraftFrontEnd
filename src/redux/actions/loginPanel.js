import * as types from '../types/loginPanel'

export function showLoginPanel(isShown) {
    return {
        type: types.SHOW_LOGIN_PANEL,
        isShown: isShown,
    }
}

export function showCredentialsPanel(isCredentialsShown) {
    return {
        type: types.SHOW_CREDENTIALS_PANEL,
        isCredentialsShown: isCredentialsShown,
    }
}