import * as types from '../types/config'

export function setConfig(config) {
    return {
        type: types.SET_CONFIG,
        config: config
    }
}
