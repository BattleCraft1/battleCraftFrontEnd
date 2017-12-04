import createReducer from '../lib/createReducer'
import * as types from '../types/loginPanel'

export const loginPanel = createReducer( {}, {
    [types.SHOW_LOGIN_PANEL]( state, action ) {
        return {
            isShown:action.isShown,
            isCredentialsShown:action.isCredentialsShown
        }

},
    [types.SHOW_CREDENTIALS_PANEL]( state, action ) {
        return {

            isShown:false,
            isCredentialsShown:action.isCredentialsShown
        }
    }
} );
