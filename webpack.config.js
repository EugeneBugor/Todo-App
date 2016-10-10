'use strict';
var webpack = require("webpack");

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
});
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    entry: isProduction ? ["./src/index.js"] : [
        'webpack-hot-middleware/client',
        "./src/index.js"
    ],
    output: {
        path: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.png$/,
                loader: "url-loader?mimetype=image/png"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            }
        ]
    },

    plugins: isProduction ? [
        new webpack.NoErrorsPlugin(),
        definePlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false}
        })
    ] : [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve: {
        extensions: ['', '.js', '.jsx','.json', '.css', '.less', '.png']
    }
};