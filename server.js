import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config';
import express from 'express';
import umphAPI from './src/js/utils/umph-api'

const api = express()
.get('/reddit', (req, res) => {

});

const app = express()
.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
});

app.use('/api', api)
.listen(3001)

umphAPI.crawler();

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', (err, result) => {

  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
