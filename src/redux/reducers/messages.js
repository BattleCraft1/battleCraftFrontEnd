import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_MESSAGE_BOX]( state, action ) {

        let newState = action.message;

        return newState;
    }
} );
