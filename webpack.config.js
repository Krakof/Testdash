'use strict';

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/js/main.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, './public'),
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/js')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['./src/sass/_variables.scss']
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: './src/assets/', to: './',  toType: 'dir' },
        ]),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

    ],
    devtool: 'eval-source-map',
    devServer: {
        port: 3000,
        noInfo: true,
        quiet: true,
        historyApiFallback: true
    }
}