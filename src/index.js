import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './redux/reducers/index'


function configureStore( initialState ) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
        ),
    );
    return createStore( reducer, initialState, enhancer );
}

const store = configureStore( {
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
        content: []
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
} );

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
