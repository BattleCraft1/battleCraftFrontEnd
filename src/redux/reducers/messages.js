import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_MESSAGE_BOX]( state, action ) {
        action.message.isShown=true;
        console.log(action.message);
        return action.message;
    },
    [types.SHOW_NETWORK_ERROR_MESSAGE_BOX]( state, action ) {
        let message;
        console.log(action.error.response);
        console.log(action.error.message);
        if(action.error===undefined || action.error.message==='Network Error'){
            message={
                isShown: true,
                messageText: "You can not connect to server!",
                messageType: "alert-danger"
            };
        }
        else if(action.error.message.indexOf('Request failed with status code ') !== -1 && action.error.response.data!==undefined)
            message={
                isShown: true,
                messageText: action.error.response.data,
                messageType: "alert-danger"
            };
        else{
            message={
                isShown: true,
                messageText: "There are not recognized problems on the server side. Please contact with administrator.",
                messageType: "alert-danger"
            };
        }

        return message;
    }
} );
