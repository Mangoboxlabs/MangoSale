// const { ApiPromise } = require('@polkadot/api')
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
//
// // eslint-disable-next-line no-unused-vars
// module.exports = (on, config) => {
//     const webpack = require('@cypress/webpack-preprocessor')
//     const options = {
//         webpackOptions: require('../webpack.config.js'),
//         configureWebpack: {
//             plugins: [new NodePolyfillPlugin()],
//         },
//     }
//
//     on('file:preprocessor', webpackPreprocessor(options))
//     on('task', {
//         createApiInstance: async () => {
//             // Replace the provider URL with your own
//             const providerUrl = 'wss://rpc.mangobox.xyz'
//             const api = await ApiPromise.create({ provider: providerUrl })
//             return api
//         },
//     })
//     function webpackPreprocessor(config) {
//         const options = {
//             webpackOptions: {
//                 resolve: {
//                     extensions: ['.js', '.jsx', '.ts', '.tsx']
//                 },
//                 module: {
//                     rules: [
//                         {
//                             test: /\.js$/,
//                             exclude: [/node_modules/],
//                             use: {
//                                 loader: 'babel-loader',
//                                 options: {
//                                     presets: ['@babel/preset-env']
//                                 }
//                             }
//                         },
//                         {
//                             test: /\.ts$/,
//                             exclude: [/node_modules/],
//                             use: {
//                                 loader: 'babel-loader',
//                                 options: {
//                                     presets: ['@babel/preset-env', '@babel/preset-typescript']
//                                 }
//                             }
//                         }
//                     ]
//                 },
//                 plugins: [
//                     new webpack.ProvidePlugin({
//                         $: 'jquery',
//                         jQuery: 'jquery'
//                     })
//                 ]
//             }
//         };
//         return require('@cypress/webpack-preprocessor')(options);
//     }
// }
