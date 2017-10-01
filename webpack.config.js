'use strict';
/**
 * Webpack config
 */
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve('./src'),
    entry: path.resolve('./src/demo'),
    output: {
        filename: 'demo.min.js'
    },
    externals: {
        angular: 'angular',
        echarts: 'echarts'
    },
    devServer: {
        disableHostCheck: true,
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader'
                }]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    }
};