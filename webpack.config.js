const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = async env => {
  const envConfig = {}
  if (env === 'dev') {
    envConfig.domain = 'http://localhost:5000'
  } else {
    envConfig.domain = 'http://prod.domain.com'
  }

  return {
    context: __dirname,
    entry: './frontend/index.jsx',
    devServer: {
      contentBase: __dirname + '/static',
      historyApiFallback: true,
    },
    output: {
      path: __dirname + '/static',
      filename: 'bundle.js',
      globalObject: 'this',
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
        algorithm: 'gzip',
      }),
      new HtmlWebpackPlugin({
        inject: false,
        title: 'popote',
        appMountId: 'root',
        template: './frontend/index.ejs',
        filename: './frontend/index.ejs',
      }),
      new webpack.DefinePlugin({
        API_DOMAIN: JSON.stringify(envConfig.domain),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|svg|pdf|ico)$/,
          use: 'url-loader?name=[path][name]-[hash:8].[ext]',
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
          ],
        },
        {
          test: /\.(js|ts)x?$/,
          use: 'babel-loader',
        },
      ],
    },
    resolve: {
      modules: ['node_modules'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      extensions: ['.js', '.jsx'],
    },
  }
}
