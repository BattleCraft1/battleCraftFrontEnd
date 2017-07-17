import createReducer from '../lib/createReducer'
import * as types from '../types/page'

export const page = createReducer( {}, {
    [types.SET_PAGE]( state, action ) {

        let newState = action.page;

        return newState;
    }
} );
