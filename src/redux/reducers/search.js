import createReducer from '../lib/createReducer'
import * as types from '../types/search'

export const search = createReducer( {}, {
    [types.SHOW_SEARCH_PANEL]( state, action ) {

        let newState = action.show;

        return newState;
    }
} );