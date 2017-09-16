import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_MESSAGE_BOX]( state, action ) {
        action.message.isShown=true;
        return action.message;
    },
    [types.SHOW_NETWORK_ERROR_MESSAGE_BOX]( state, action ) {
        let message;
        try {
        console.log(action.error.response);
        if(action.error===undefined || action.error.message==='Network Error'){
            message={
                isShown: true,
                messageText: "You can not connect to server!",
                messageType: "alert-danger"
            };
        }
        else if(action.error.response.status !== 200 &&
            action.error.response.data!==undefined &&
            typeof action.error.response.data==="string"){
            message={
                isShown: true,
                messageText: action.error.response.data,
                messageType: "alert-danger"
            };
        }
        else{
            message={
                isShown: true,
                messageText: "There are not recognized problems on the server side. Please contact with administrator.",
                messageType: "alert-danger"
            };
        }
            return message;
        }
        catch (e){
            message={
                isShown: true,
                messageText: "There are not recognized problems on the server side. Please contact with administrator.",
                messageType: "alert-danger"
            };
            return message;
        }
    },
    [types.HIDE_MESSAGE_BOX]( state, action ) {
        let message = {};
        message.isShown=false;
        return message;
    },
} );
