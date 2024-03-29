import React from 'react';
import ReactDOM from 'react-dom';
import Index from './pages/index';
import * as serviceWorker from './serviceWorker';
import {setBaseURL } from './Agent';
import Janus from "./utils/janus";

Janus.init({
    debug: true
});

setBaseURL(process.env.REACT_APP_API_URL)

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
