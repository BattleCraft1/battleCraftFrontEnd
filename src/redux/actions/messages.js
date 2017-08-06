import * as types from '../types/messages'

export function showMessageBox(message) {
    return {
        type: types.SHOW_MESSAGE_BOX,
        message: message
    }
}
