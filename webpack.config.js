'use strict';
/**
 * Webpack config
 */
const webpack = require('webpack');
const path = require('path');

const IS_DEV = process.env.npm_lifecycle_event === "dev";

module.exports = {
    context: path.resolve('./src'),
    entry: path.resolve("./src/demo"),
    output: {
        path: path.resolve('./dist'),
        filename: 'demo.min.js'
    },
    externals: {
        angular: "angular"
    },
    devServer: {
        disableHostCheck: true,
    },
    devtool: IS_DEV ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015"]
                        }
                    }, {
                        loader: "eslint-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/
        })
    ]
};