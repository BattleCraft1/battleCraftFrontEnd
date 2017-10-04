import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as ConfirmationActions from './confirmation'
import * as MessagesActions from './messages'
import * as SearchPanelActions from './search'

export const ActionCreators = Object.assign( {},
    PageActions,
    PageRequestActions,
    ConfirmationActions,
    MessagesActions,
    SearchPanelActions
);
