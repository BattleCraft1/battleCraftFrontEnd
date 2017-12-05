import * as types from '../types/securityPanels'

export function showLoginPanel(isShown) {
    return {
        type: types.SHOW_LOGIN_PANEL,
        isShown: isShown,
    }
}

export function showForgotCredentialsPanel(isShown) {
    return {
        type: types.SHOW_FORGOT_CREDENTIALS_PANEL,
        isShown: isShown,
    }
}

export function showRegisterPanel(isShown) {
    return {
        type: types.SHOW_REGISTER_PANEL,
        isShown: isShown,
    }
}

export function showResendMailPanel(isShown) {
    return {
        type: types.SHOW_RESEND_MAIL_PANEL,
        isShown: isShown,
    }
}

export function showChangePasswordPanel(isShown) {
    return {
        type: types.SHOW_CHANGE_PASSWORD_PANEL,
        isShown: isShown,
    }
}