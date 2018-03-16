import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import 'jquery/dist/jquery.min.js'
import 'semantic-ui-css/semantic.min.css';
import 'golden-layout/dist/goldenlayout.min.js'
import 'golden-layout/src/css/goldenlayout-base.css'
import 'golden-layout/src/css/goldenlayout-dark-theme.css'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => { render(App) })
}

registerServiceWorker();