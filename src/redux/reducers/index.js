import { combineReducers } from 'redux'
import * as pageReducer from './page'
import * as pageRequestReducer from './pageRequest'
import * as confirmationReducer from './confirmation'

export default combineReducers( Object.assign(
    pageReducer,
    pageRequestReducer,
    confirmationReducer
) );
