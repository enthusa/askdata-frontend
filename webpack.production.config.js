const webpack = require('webpack');
const config = require('./webpack.config.js');

config.devtool = false;

config.plugins = (config.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
]);

module.exports = config;
