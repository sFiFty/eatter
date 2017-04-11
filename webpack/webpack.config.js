var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: DEBUG ? 'eval' : false,

  cache: DEBUG,

  entry: DEBUG ? [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.join(__dirname, '..', 'src', 'js', 'app.js'),
  ] : [
    'babel-polyfill',
    path.join(__dirname, '..', 'src', 'js', 'app.js'),
  ],

  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/',
    filename: DEBUG ? 'js/bundle.js' : 'js/bundle.min.js',
  },

  module: {
    rules: [

      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
              ],
            },
          },
        ],
        exclude: /(node_modules)/,
        include: path.join(__dirname, '..', 'src'),
      },

      {
        test: /\.s?sass$/,
        loader: DEBUG ? [
          'style-loader',
          'css-loader',
          'sass-loader',
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                minimize: 1,
              },
            },
            'sass-loader',
          ],
        }),
      },

      {
        test: /\.(jpe?g|gif|png)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[ext]',
          },
        }],
      },

      {
        test: /(\.(otf|eot|ttf|woff(2)?)(\?[a-z0-9=&#.]+)?)|(.+\/fonts\/.+\.svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        }],
      },

      {
        test: /\.ogg$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'audio/[name].[ext]',
          },
        }],
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.(svg)$/,
        loader: 'raw-loader',
        exclude: [
          path.resolve(__dirname, '../assets/img'),
          path.resolve(__dirname, '../assets/fonts'),
        ],
      },

      {
        test: /img\/.+\.svg$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
          },
        }],
      },
    ]
  },

  resolve: {
    modules: [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'src', 'js'),
      'node_modules',
    ],
    alias: {
      'assets': path.join(__dirname, '..', 'assets'),
    },
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ].concat(DEBUG ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        environment: 'development',
        favicon: path.join(__dirname, '..', 'assets', 'img', 'favicon.png'),
      }),
    ] : [
      new ExtractTextPlugin({ filename: 'css/main.css' }),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        comments: false,
      }),
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        environment: 'production',
        favicon: path.join(__dirname, '..', 'assets', 'img', 'favicon.png'),
      }),
      new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb.js$/),
  ]),

  target: 'web',

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
