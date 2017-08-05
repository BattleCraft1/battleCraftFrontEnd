import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as ConfirmationActions from './confirmation'

export const ActionCreators = Object.assign( {},
    PageActions,
    PageRequestActions,
    ConfirmationActions
);
