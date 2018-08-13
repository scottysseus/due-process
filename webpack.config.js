const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            createjs: 'createjs/builds/1.0.0/createjs.js'
        }
    },
    module: {
        rules: [{
            test: /node_modules[/\\]createjs/,
            loaders: [
                'imports-loader?this=>window',
                'exports-loader?window.createjs'
            ]
        }, {
            use: {
            loader:'babel-loader',
            options: { presets: ['es2015'] }
            },
            test: /\.js$/,
            exclude: /node_modules/
        }]
    },
    devtool: "source-map"
};
