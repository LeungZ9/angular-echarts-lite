'use strict';
/**
 * Webpack config
 */
const webpack = require('webpack');
const path = require('path');

const IS_DEV = process.env.npm_lifecycle_event === "dev";
const IS_MIN = process.env.npm_lifecycle_event === "build:min";

module.exports = {
    context: path.resolve('./src'),
    entry: path.resolve("./src/angular-echarts-lite"),
    output: {
        path: path.resolve('./dist'),
        filename: 'angular-echarts-lite' + (IS_MIN ? '.min.js' : '.js'),
        libraryTarget: "umd"
    },
    externals: {
        angular: "angular",
        echarts: "echarts"
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
    ],
    devServer: {
        contentBase: path.resolve("./demo")
    }
};