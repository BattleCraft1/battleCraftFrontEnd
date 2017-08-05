import * as types from '../types/confirmation'

export function showConfirmationDialog(isShownConfirmationDialog) {
    return {
        type: types.SHOW_CONFIRMATION_DIALOG,
        isShownConfirmationDialog: isShownConfirmationDialog
    }
}
