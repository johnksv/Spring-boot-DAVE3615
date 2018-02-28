import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {routes} from './routes';
import "./css/bootstrap.4.min.css";


function renderApp() {
    ReactDOM.render(<BrowserRouter children={routes}/>,
        document.getElementById('root')
    );
}

renderApp();
