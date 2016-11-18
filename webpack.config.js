var webpack = require('webpack');
var path = require('path');

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
                test: /\.jsx$/, 
                loaders: ['jsx-loader?harmony'], 
                include: path.join(__dirname, 'src')
            },
            {
              test: /\.js$/, loader: 'babel-loader', query: {
                presets: ['react', 'es2015']
              }
            },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    }
};