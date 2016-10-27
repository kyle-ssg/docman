import express from 'express';
import exphbs from 'express-handlebars';
import spm from './middleware/single-page-middleware';
import https from 'https';
import _ from 'lodash';

import webpackMiddleware from './middleware/webpack-middleware';

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

      var collection = JSON.parse(str);

      collection.requests = _.map(collection.requests, (request)=> {
        var headers = request.headers.split(/\n/g);
        var headersObj = {};

        _.each(headers, function (header) {
          var parts = header.split(':');
          if (parts.length == 2) {
            headersObj[parts[0]] = parts[1].trim(' ');
          }
        });

        request.headers = JSON.stringify(headersObj, null, 2);
        return {
          headers: request.headers,
          body: request.rawModeData,
          method: request.method,
          description: request.description,
          name: request.name,
          url: request.url,
          id: request.id
        };

      });


      var requestsById = _.keyBy(collection.requests, 'id');

      _.each(collection.folders, (coll)=>{
        coll.requests = coll.order.map((id)=>requestsById[id]);
        delete coll.order;
      });

      var environments = collection.description.match(/\[ENVIRONMENTS.*?\]/);
      var description = collection.description.replace(/\[ENVIRONMENTS.*?\]/,"");

        if (environments) {
            environments = environments[0].replace('[ENVIRONMENTS=',"").replace("]","").split(',').map((i)=>{
                var parts = i.split('-');
                return {
                    name:parts[0],
                    url:parts[1]
                }
            });
        }
      console.log(collection.description);

      res.json({
        name: collection.name,
        description,
        environments,
        folders: collection.folders
      })
    });
  };

  https.request(options, callback).end();

});


app.listen(process.env.PORT || 3000, function () {
  console.log('express-handlebars example server listening on: 3000');
});
