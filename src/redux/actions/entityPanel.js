import * as types from '../types/entityPanel'

export function editEntity(entityType,entityName) {
    return {
        type: types.EDIT_ENTITY,
        entityType: entityType,
        entityName: entityName
    }
}

export function addEntity(entityType) {
    return {
        type: types.ADD_ENTITY,
        entityType: entityType
    }
}

export function showEntity(entityType,entityName) {
    return {
        type: types.SHOW_ENTITY,
        entityType: entityType,
        entityName: entityName
    }
}

export function disableEntityPanel() {
    return {
        type: types.DISABLE_ENTITY_PANEL
    }
}