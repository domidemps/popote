const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: ["./src/index.jsx", "./src/index.html"],
    devServer: {
        contentBase: __dirname + "/static",
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                secure: false
            },
            '/logout': {
                target: 'http://localhost:5000',
                secure: false
            }
        }
    },
    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
        globalObject: 'this'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            algorithm: 'gzip'
            })
    ],
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|svg|pdf|ico)$/,
                use: "url-loader?name=[path][name]-[hash:8].[ext]"
            },
            {
                test: /\.html$/,
                use: "file-loader?name=[name].[ext]"
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader",
                    {
                        loader: "eslint-loader",
                        options: {configFile: __dirname + "/.eslintrc"}
                    }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};