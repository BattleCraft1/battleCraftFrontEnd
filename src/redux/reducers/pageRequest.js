import createReducer from '../lib/createReducer'
import * as types from '../types/pageRequest'

export const pageRequest = createReducer( {}, {
    [types.SET_PAGE_REQUEST]( state, action ) {
        return {
            searchCriteria:state.searchCriteria,
            size: action.pageSize,
            page: action.pageNumber,
            direction: action.sortDirection,
            property: action.sortProperty,

        };
    },
    [types.SET_PAGE_NUMBER]( state, action ) {
        return {
            searchCriteria:state.searchCriteria,
            size: state.size,
            page: action.pageNumber,
            direction: state.direction,
            property: state.property,

        };
    },
    [types.SET_PAGE_REQUEST_SIZE_AND_NUMBER]( state, action ) {
        console.log(state);
        return {
            searchCriteria:state.searchCriteria,
            size: action.pageSize,
            page: action.pageNumber,
            direction: state.direction,
            property: state.property,

        };
    },
    [types.SET_PAGE_REQUEST_SORT_PROPERTIES]( state, action ) {
        return {
            searchCriteria:state.searchCriteria,
            size: state.size,
            page: state.page,
            direction: action.direction,
            property: action.columnName,

        };
    },
    [types.SET_SEARCH_CRITERIA]( state, action ) {
        return {
            searchCriteria:action.searchCriteria,
            size: state.size,
            page: state.page,
            direction: state.direction,
            property: state.property,
        };
    }
} );
