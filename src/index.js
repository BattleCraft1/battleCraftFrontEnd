import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers/index'
import {entityPanelModes} from './main/consts/entityPanelModes'
import {entityPanelTypes} from './main/consts/entityPanelTypes'

function configureStore( initialState ) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        ),
    );
    return createStore( reducer, initialState, enhancer );
}

const store = configureStore( {
    search:false,
    possibleOperations:[],
    entityPanel: {
        mode:entityPanelModes.disabled,
        entityType:entityPanelTypes.none,
        entityName:"",
        hidden:false,
        relatedEntity:{
            relatedEntities:[],
            relatedEntityType:"",
            relatedEntityCriteria:[],
            relatedEntityLimit:0,
            operationCanceled:false
        }
    },
    additionalEntityPanel:{
        additionalEntityType:entityPanelTypes.none,
        additionalEntityName:""
    },
    confirmation: {
        header:"",
        message:"",
        onConfirmFunction: function () {
        },
        isShown: false
    },
    message:{
        isShown: false,
        messageText: "",
        messageType: ""
    },
    page: {
        content: [],
        checkedElementsNames: []
    },
    pageRequest: {pageRequest:{
        size:10,
        page:0,
        direction: "ASC",
        property: "name"
    },
        searchCriteria:[
        ]
    },
    securityPanels: {
        isRegisterPanelShown:false,
        isLoginPanelShown:false,
        isForgotCredentialsPanelShown:false,
        isResendMailPanelShown:false,
        isChangePasswordPanelShown:false
    },
    security:{
        token:"",
        role:"",
        username:""
    },
    reportPanel:{
        isShown:false,
        objectType:"",
        objectNames:[]
    }
} );


ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
