const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const env = process.env.NODE_ENV || 'development'
// var dotenv = require('dotenv');
// var env = dotenv.config({path: __dirname + '/.env'});
var screensComponentRegex = /screens\/([^\/]+\/?[^\/]+).jsx$/
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = (env) => {
  // const envKeys = Object.keys(env).reduce((prev, next) => {
  //   prev[`process.env.${next}`] = JSON.stringify(env[next]);
  //   return prev;
  // }, {});
  // console.log("envKeys", envKeys);

  return {
    entry: ['webpack-dev-server/client?http://localhost:4001',
            'webpack/hot/only-dev-server',  
            './src/index'],
    mode: "development",
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, 'src'),
      compress: true,
      port: 4001,
      host: '0.0.0.0',
      noInfo: true,
      quiet: true,
      publicPath: '/',
      historyApiFallback: true,
      disableHostCheck: true,
      inline: true,
      overlay: {
        warnings: false,
        errors: true
      },
      watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: 1000

      }
    },
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name]-[hash].js'
    },
    devtool: 'cheap-eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'src'),
          loaders: ['babel-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ['file-loader']
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        { test: /\.css$/, use: ['style-loader','css-loader'] },
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        hash: false,
        template: './public/index.html',
        cache: true,
        filename: 'index.html'
      }),
      new webpack.ProvidePlugin({
        _: 'lodash',
        React: 'react',
        ReactDOM: 'react-dom'
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.API_URL": JSON.stringify("http://localhost:3000"),
        "process.env.GOOGLE_STATIC_MAP_API_KEY": JSON.stringify("XXX"),
        "process.env.ONESIGNAL_APP_ID": JSON.stringify("XXX"),
        "process.env.GOOGLE_CLOUD_BUCKET_NAME":JSON.stringify("visioconsult")
      }),
      new WebpackPwaManifest({
        name: 'Visio Consult Console',
        short_name: 'VisioConsult',
        description: 'VisioConsult Console ',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024' // you can also use the specifications pattern
          }
        ],
        "gcm_sender_id": "482941778795",
        "gcm_sender_id_comment": "Do not change the GCM Sender ID",
        fingerprints: false
      })
    ]
  }
  
}
