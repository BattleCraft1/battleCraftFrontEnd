import createReducer from '../lib/createReducer'
import * as types from '../types/securityPanels'

export const securityPanels = createReducer( {}, {
    [types.SHOW_LOGIN_PANEL]( state, action ) {
        return {
            isRegisterPanelShown:false,
            isLoginPanelShown:action.isShown,
            isForgotCredentialsPanelShown:false,
            isResendMailPanelShown:false,
            isChangePasswordPanelShown: false
        }

    },
    [types.SHOW_FORGOT_CREDENTIALS_PANEL]( state, action ) {
        return {
            isRegisterPanelShown:false,
            isLoginPanelShown:false,
            isForgotCredentialsPanelShown:action.isShown,
            isResendMailPanelShown:false,
            isChangePasswordPanelShown: false
        }
    },
    [types.SHOW_REGISTER_PANEL]( state, action ) {
        return {
            isRegisterPanelShown:action.isShown,
            isLoginPanelShown:false,
            isForgotCredentialsPanelShown:false,
            isResendMailPanelShown:false,
            isChangePasswordPanelShown: false
        }
    },
    [types.SHOW_RESEND_MAIL_PANEL]( state, action ) {
        return {
            isRegisterPanelShown:false,
            isLoginPanelShown:false,
            isForgotCredentialsPanelShown:false,
            isResendMailPanelShown:action.isShown,
            isChangePasswordPanelShown: false
        }
    },
    [types.SHOW_CHANGE_PASSWORD_PANEL]( state, action ) {
        return {
            isRegisterPanelShown:false,
            isLoginPanelShown:false,
            isForgotCredentialsPanelShown:false,
            isResendMailPanelShown:false,
            isChangePasswordPanelShown: action.isShown
        }
    }
} );
