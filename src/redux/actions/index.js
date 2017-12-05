import * as PageActions from './page'
import * as PageRequestActions from './pageRequest'
import * as ConfirmationActions from './confirmation'
import * as MessagesActions from './messages'
import * as SearchPanelActions from './search'
import * as EntityPanelActions from './entityPanel'
import * as PossibleOperationsActions from './possibleOperations'
import * as AdditionalEntityPanelActions from './additionalEntityPanel'
import * as LoginPanelActions from './securityPanels'
import * as ReportPanelActions from './reportPanel'
import * as SecurityPanelActions from './security'
import * as LoadingActions from './loading'

export const ActionCreators = Object.assign( {},
    PageActions,
    PageRequestActions,
    ConfirmationActions,
    MessagesActions,
    SearchPanelActions,
    EntityPanelActions,
    PossibleOperationsActions,
    AdditionalEntityPanelActions,
    LoginPanelActions,
    ReportPanelActions,
    SecurityPanelActions,
    LoadingActions
);
