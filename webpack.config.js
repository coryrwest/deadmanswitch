var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        './src/main.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'js/bundle.js',
        publicPath: '/public'
    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)$/, loader: 'babel-loader', query: {
                    presets: ['react', 'es2015']
                },
                include: path.join(__dirname, 'src')
            },
            { test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract(
                   "style",
                   "css?sourceMap!postcss-loader!sass?sourceMap"
               )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles/styles.css")
    ]
};