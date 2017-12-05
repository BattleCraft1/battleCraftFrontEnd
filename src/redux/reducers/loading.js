import createReducer from '../lib/createReducer'
import * as types from '../types/loading'

export const loading = createReducer( {}, {
    [types.START_LOADING]( state, action ) {
        let loading;
        loading={
            dataFetched: true,
            message: action.message
        };
        return loading;
    },
    [types.STOP_LOADING]( state, action ) {
        let loading;
        loading={
            dataFetched: false,
        };
        return loading;
    }
} );
