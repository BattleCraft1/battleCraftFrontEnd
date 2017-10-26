import createReducer from '../lib/createReducer'
import * as types from '../types/additionalEntityPanel'

export const additionalEntityPanel = createReducer( {}, {
    [types.SHOW_ADDITIONAL_ENTITY_PANEL]( state, action ) {
        console.log(state);
        return {
            additionalEntityType:action.additionalEntityType,
            additionalEntityName:action.additionalEntityName
        };
    },
    [types.DISABLE_ADDITIONAL_ENTITY_PANEL]( state, action ) {
        return {
            additionalEntityType:"",
            additionalEntityName:"",
        };
    }
} );
