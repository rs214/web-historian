var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
// var serveAssets = require('../web/http-helpers').serveAssets;
var httpHelpers = require('../web/http-helpers');
var serveAssets = httpHelpers.serveAssets;
var headers = httpHelpers.headers;
// require more modules/folders here!


var handle = {
  'GET': (req, res) => {
    var page = req.url.substr(1);

    if (page.length) {

      serveAssets('GET', page, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(404);
        }
        res.end(data);
      });
    } else {
      fs.readFile('web/public/index.html', 'utf8', (err, data) => res.end(data));
    }
  },

  'POST': (req, res) => {
    if (req.url.length <= 1) {
      var stringOfChunks = '';
      req.on('data', function(chunk) {
        stringOfChunks += chunk;
      });
      req.on('end', function(chunk) {
        var index = stringOfChunks.indexOf('=');
        var page = stringOfChunks.substr(index + 1);

        serveAssets('POST', page, (err, data) => {
          if (err) {
            console.log(err);
            res.writeHead(404);
          }
          res.end(data);
        });

      });
    }
  },

  'OPTIONS': (req, res) => {
    throw new Error('OPTIONS');
  }
};


exports.handleRequest = function (req, res) {

  //  req.url === '/www.google.com/'
  // console.log(req);

  console.log(`${req.method} ${req.url}`);
  if (req.method in handle) {
    handle[req.method](req, res);
  } else {
    res.writeHead(404);
    res.end('Improper http request');
  }
};
