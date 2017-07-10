import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App';
import {Route, BrowserRouter} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
        <div>
            <Route path="/" component={App}>
            </Route>
        </div>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
