import { combineReducers } from 'redux'
import * as pageReducer from './page'
import * as pageRequestReducer from './pageRequest'
import * as confirmationReducer from './confirmation'
import * as messagesReducer from './messages'
import * as searchReducer from './search'
import * as entityPanelReducer from './entityPanel'
import * as possibleOperationsReducer from './possibleOperations'
import * as additionalEntityPanelReducer from './additionalEntityPanel'
import * as loginPanelReducer from './securityPanels'
import * as securityReducer from './security'
import * as reportPanelReducer from './reportPanel'

export default combineReducers( Object.assign(
    pageReducer,
    pageRequestReducer,
    confirmationReducer,
    messagesReducer,
    searchReducer,
    entityPanelReducer,
    possibleOperationsReducer,
    additionalEntityPanelReducer,
    loginPanelReducer,
    securityReducer,
    reportPanelReducer
) );
