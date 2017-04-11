var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('../webpack/webpack.config');
var logger = require('./logger');

var app = express();
var compiler = webpack(config);

const argv = require('minimist')(process.argv.slice(2));
const port = 3000;
const customHost = argv.host || process.env.HOST;
const host = customHost || null;
const prettyHost = customHost || 'localhost';

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/',
  quiet: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('*', (req, res, next) => {
  var filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type','text/html');
    res.send(result);
    res.end();
  });
});

app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
