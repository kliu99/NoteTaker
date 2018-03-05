import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'jquery/dist/jquery.min.js'
import 'golden-layout/dist/goldenlayout.min.js'
import 'golden-layout/src/css/goldenlayout-base.css'
import 'golden-layout/src/css/goldenlayout-dark-theme.css'

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
