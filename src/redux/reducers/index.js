import { combineReducers } from 'redux'
import * as configReducer from './config'
import * as pageReducer from './page'
import * as pageRequestReducer from './pageRequest'

export default combineReducers( Object.assign(
    configReducer,
    pageReducer,
    pageRequestReducer
) );
