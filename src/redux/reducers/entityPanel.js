import createReducer from '../lib/createReducer'
import * as types from '../types/entityPanel'
import {entityPanelModes} from '../../main/consts/entityPanelModes'
import {entityPanelTypes} from '../../main/consts/entityPanelTypes'

<<<<<<< HEAD
export const editPanel = createReducer( {}, {
=======
export const entityPanel = createReducer( {}, {
>>>>>>> master
    [types.ADD_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.add,
            entityType:action.entityType
        };
    },
    [types.EDIT_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.edit,
            entityType:action.entityType,
            entityName:action.entityName
        };
    },
    [types.SHOW_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.show,
            entityType:action.entityType,
            entityName:action.entityName
        };
    },
    [types.HIDE_ENTITY_PANEL]( state, action ) {
        return {
            mode:entityPanelModes.disabled,
            entityType:entityPanelTypes.none,
            entityName:""
        };
    }
} );
