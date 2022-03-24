var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')
const CompressionPlugin = require('compression-webpack-plugin');

const BUILD_PATH = 'build'
module.exports = env => {
  return {
    entry: './src/index',
    output: {
      //path: path.join(__dirname, '..', 'dist/frontend'),
      path: path.join(__dirname, BUILD_PATH),
      publicPath: '/',
      filename: '[name]-[hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss', '.json']
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          include: path.join(__dirname, 'src'),
          loader: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [{
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: 'assets/images/[name]-[hash].[ext]'
              }
            }
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: 'assets/fonts/[name]-[hash].[ext]'
            }
          }]
        },
        // { test: /\.css$/, use: ['style-loader','css-loader'] },
      ]
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          extractComments: 'all'
        })
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
        "process.env.API_URL": JSON.stringify(env.API_URL),
        "process.env.ONESIGNAL_APP_ID": JSON.stringify(env.ONESIGNAL_APP_ID),
        "process.env.GOOGLE_API_KEY": JSON.stringify(env.GOOGLE_API_KEY),
        "process.env.GOOGLE_CLOUD_BUCKET_NAME":JSON.stringify("visioconsult")
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      //new ExtractTextPlugin('[name]-[hash].css'),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        hash: false,
        template: './public/index.html',
        filename: 'index.html',
        minify: true
      }),
      new CopyWebpackPlugin([{
        from: './firebase.json',
      }, {
        from: './public/404.html'
      }, {
        from: './public/OneSignalSDKUpdaterWorker.js',
      },
      {
        from: './public/OneSignalSDKWorker.js',
      }
      ]),
      new WebpackPwaManifest({
        name: 'VisioConsult Console',
        short_name: 'VisioConsult',
        description: 'VisioConsult Console ',
        background_color: '#347EFF',
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