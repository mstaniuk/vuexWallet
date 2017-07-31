const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './app/js/entry.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    }
}