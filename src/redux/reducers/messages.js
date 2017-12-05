import createReducer from '../lib/createReducer'
import * as types from '../types/messages'

export const message = createReducer( {}, {
    [types.SHOW_FAILURE_MESSAGE_BOX]( state, action ) {
        return {
            isShown:true,
            messageType:"alert-danger",
            messageText:action.message
        };
    },
    [types.SHOW_SUCCESS_MESSAGE_BOX]( state, action ) {
        return {
            isShown:true,
            messageType:"alert-success",
            messageText:action.message
        };
    },
    [types.SHOW_NETWORK_ERROR_MESSAGE_BOX]( state, action ) {
        let message;
        console.log(action.error);
        try {
            if(action.error===undefined || action.error.message==='Network Error'){
                message={
                    isShown: true,
                    messageText: "You can not connect to server!",
                    messageType: "alert-danger"
                };
            }
            else if(action.error.response.status !== 200){
                if((typeof action.error.response.data)!=="string" || action.error.response.data==="")
                    throw new Error("error is not a string value");
                if(action.error.response.status === 401)
                    message={
                        isShown: true,
                        messageText: "You are unauthorized",
                        messageType: "Unauthorized"
                    };
                else
                message={
                    isShown: true,
                    messageText: action.error.response.data,
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
