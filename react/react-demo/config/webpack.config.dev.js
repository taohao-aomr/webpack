/**
 * @type {import('webpack-dev-server').Configuration}
 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const devServer = {
    static: {
        directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9100,
    allowedHosts: 'auto',
    hot: true,
    open: true,
    host: 'localhost',
};

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const devConfig = { 
	mode: 'development',
    devtool: "cheap-module-source-map",
	devServer: devServer
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
