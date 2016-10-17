import express from 'express';
import exphbs from 'express-handlebars';
import spm from './middleware/single-page-middleware';
import https from 'https';

import webpackMiddleware from './middleware/webpack-middleware';
import DocumentTitle from 'react-document-title';
import serverRouter from './server-router';
import _ from 'lodash';
import api from './api';

console.log(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV !== 'production';
const app = express();

if (isDev) { //Serve files from src directory and use webpack-dev-server
  console.log('Enabled Webpack Hot Reloading');
  webpackMiddleware(app);

  app.set('views', 'src/');
  app.use(express.static('src'));
} else { //Serve files from build directory
  console.log('Started in production mode');
  app.use(express.static('build'));
  app.set('views', 'build/');
}

app.use(spm);
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  return res.render('index', {
    isDev,
    title: 'pstmn',
  });
});

//Navigate to docs
app.get('/api/:id', function (req, res) {
  var options = {
    host: 'www.getpostman.com',
    path: '/collections/' + req.params.id
  };

  console.log(options.path);


  var callback = function (response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.json(JSON.parse(str));
    });
  };

  https.request(options, callback).end();

});


app.listen(3000, function () {
  console.log('express-handlebars example server listening on: 3000');
});
