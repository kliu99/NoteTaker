const webpack = require('webpack');
const { compose } = require('react-app-rewired');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = (config, env) => {
    const rewire = compose(
        rewireReactHotLoader
    );

    config.plugins.push(
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            $: 'jquery',
            jQuery: 'jquery'
        }));

    return rewire(config, env);
}