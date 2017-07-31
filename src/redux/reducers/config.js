import createReducer from '../lib/createReducer'
import * as types from '../types/config'

export const config = createReducer( {}, {
    [types.SET_CONFIG]( state, action ) {

        let newState = action.config;

        return newState;
    }
} );

